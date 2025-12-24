import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface LearningModule {
  id: string;
  slug: string;
  title: string;
  icon: string;
  category: string;
}

interface LearningTopic {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  duration: string | null;
  sort_order: number;
}

interface UserProgress {
  id: string;
  user_id: string;
  topic_id: string;
  completed: boolean;
  listened_at: string | null;
}

interface ModuleWithProgress extends LearningModule {
  topics: LearningTopic[];
  completedCount: number;
  totalCount: number;
  progress: number;
}

export const useLearningProgress = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Fetch modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('learning_modules')
        .select('*')
        .order('created_at');

      if (modulesError) throw modulesError;

      // Fetch topics
      const { data: topicsData, error: topicsError } = await supabase
        .from('learning_topics')
        .select('*')
        .order('sort_order');

      if (topicsError) throw topicsError;

      // Fetch user progress if logged in
      let progressData: UserProgress[] = [];
      if (user) {
        const { data, error: progressError } = await supabase
          .from('user_learning_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;
        progressData = data || [];
      }

      setUserProgress(progressData);

      // Combine data
      const modulesWithProgress: ModuleWithProgress[] = (modulesData || []).map((module) => {
        const moduleTopics = (topicsData || []).filter((t) => t.module_id === module.id);
        const completedTopics = moduleTopics.filter((t) =>
          progressData.some((p) => p.topic_id === t.id && p.completed)
        );

        return {
          ...module,
          topics: moduleTopics,
          completedCount: completedTopics.length,
          totalCount: moduleTopics.length,
          progress: moduleTopics.length > 0 
            ? Math.round((completedTopics.length / moduleTopics.length) * 100) 
            : 0,
        };
      });

      setModules(modulesWithProgress);
    } catch (error) {
      console.error('Error fetching learning data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const markTopicAsListened = async (topicId: string) => {
    if (!user) {
      toast.error('Please login to track your progress');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_learning_progress')
        .upsert({
          user_id: user.id,
          topic_id: topicId,
          completed: true,
          listened_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,topic_id'
        });

      if (error) throw error;

      toast.success('Progress saved!');
      await fetchData();
      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
      return false;
    }
  };

  const isTopicCompleted = (topicId: string): boolean => {
    return userProgress.some((p) => p.topic_id === topicId && p.completed);
  };

  const getTopicsByModuleSlug = (slug: string): LearningTopic[] => {
    const module = modules.find((m) => m.slug === slug);
    return module?.topics || [];
  };

  const getOverallProgress = (): number => {
    const totalTopics = modules.reduce((acc, m) => acc + m.totalCount, 0);
    const completedTopics = modules.reduce((acc, m) => acc + m.completedCount, 0);
    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  };

  return {
    modules,
    loading,
    markTopicAsListened,
    isTopicCompleted,
    getTopicsByModuleSlug,
    getOverallProgress,
    refetch: fetchData,
  };
};

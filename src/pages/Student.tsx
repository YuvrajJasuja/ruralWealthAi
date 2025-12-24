import { Volume2, Home, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { useAuth } from "@/hooks/useAuth";

const Student = () => {
  const { user } = useAuth();
  const { getTopicsByModuleSlug, isTopicCompleted, markTopicAsListened, loading } = useLearningProgress();
  
  const topics = getTopicsByModuleSlug('student');

  const handleListen = async (topicSlug: string) => {
    const topic = topics.find(t => t.slug === topicSlug);
    if (topic) {
      await markTopicAsListened(topic.id);
    }
  };

  const getTopicCompleted = (topicSlug: string) => {
    const topic = topics.find(t => t.slug === topicSlug);
    return topic ? isTopicCompleted(topic.id) : false;
  };

  const modules = [
    {
      title: "Education Loans",
      description: "Learn about loans and repayment options.",
      icon: "🎓",
      color: "bg-primary",
      topicSlug: "study-techniques",
    },
    {
      title: "Pocket Money Management",
      description: "Budgeting tips for managing your allowance.",
      icon: "💰",
      color: "bg-accent",
      topicSlug: "time-management",
    },
    {
      title: "Digital Payments Basics",
      description: "How to use secure digital transactions.",
      icon: "📱",
      color: "bg-secondary",
      topicSlug: "exam-preparation",
    },
    {
      title: "Scholarship Awareness",
      description: "Find and apply for available scholarships.",
      icon: "⭐",
      color: "bg-secondary",
      topicSlug: "note-taking",
    },
    {
      title: "Online Scams",
      description: "Identify and avoid financial fraud online.",
      icon: "🛡️",
      color: "bg-terracotta",
      topicSlug: "career-guidance",
    },
    {
      title: "Importance of Saving",
      description: "Build a secure future through savings.",
      icon: "🐷",
      color: "bg-primary",
      topicSlug: null,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/20">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">🌾💰</div>
              <h1 className="text-4xl font-bold">Student Financial Education</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="secondary" className="gap-2">
                <Volume2 className="w-4 h-4" />
                Audio Guidance in Local Languages
              </Button>
              <select className="px-4 py-2 rounded-lg bg-white text-foreground">
                <option>Select Language</option>
                <option>Hindi</option>
                <option>English</option>
                <option>Marathi</option>
                <option>Bengali</option>
              </select>
            </div>
          </div>
        </section>

        {!user && (
          <div className="container mx-auto px-4 py-4 max-w-6xl">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-muted-foreground">
                <Link to="/auth" className="text-primary underline">Login</Link> to track your learning progress
              </p>
            </div>
          </div>
        )}

        {/* Learning Modules */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Financial Skills for Students
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <Card
                  key={index}
                  className={`${module.color} text-white p-6 hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer`}
                >
                  <div className="text-6xl mb-4">{module.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{module.description}</p>
                  <Button
                    variant="secondary"
                    className="w-full gap-2"
                    onClick={() => module.topicSlug && handleListen(module.topicSlug)}
                    disabled={loading || !module.topicSlug}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : module.topicSlug && getTopicCompleted(module.topicSlug) ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                    {module.topicSlug && getTopicCompleted(module.topicSlug) ? 'Completed' : 'Start Learning'}
                  </Button>
                </Card>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-muted">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2">Study Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Access free financial literacy materials and guides
                </p>
              </Card>

              <Card className="p-6 bg-muted">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-xl font-bold mb-2">Peer Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Join student communities to share money management tips
                </p>
              </Card>

              <Card className="p-6 bg-muted">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Set Goals</h3>
                <p className="text-sm text-muted-foreground">
                  Track your savings goals and celebrate milestones
                </p>
              </Card>
            </div>

            {/* Interactive Section */}
            <Card className="mt-12 p-8 bg-gradient-to-r from-accent to-secondary text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-8xl">🤖</div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Ask our AI Guide</h3>
                  <p className="mb-4">
                    Have questions about scholarships, student loans, or money management? 
                    Get instant answers in your language!
                  </p>
                  <Button variant="secondary" className="gap-2" size="lg">
                    <Volume2 className="w-5 h-5" />
                    Start Voice Chat
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Student;

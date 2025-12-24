-- Create learning modules table
CREATE TABLE public.learning_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning topics table
CREATE TABLE public.learning_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID NOT NULL REFERENCES public.learning_modules(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  duration TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(module_id, slug)
);

-- Create user learning progress table
CREATE TABLE public.user_learning_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.learning_topics(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  listened_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

-- Enable RLS on all tables
ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_progress ENABLE ROW LEVEL SECURITY;

-- Learning modules and topics are publicly readable
CREATE POLICY "Anyone can view learning modules"
ON public.learning_modules FOR SELECT
USING (true);

CREATE POLICY "Anyone can view learning topics"
ON public.learning_topics FOR SELECT
USING (true);

-- User progress policies
CREATE POLICY "Users can view their own progress"
ON public.user_learning_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.user_learning_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_learning_progress FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_learning_progress_updated_at
BEFORE UPDATE ON public.user_learning_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial data for modules
INSERT INTO public.learning_modules (slug, title, icon, category) VALUES
('banking-basics', 'Banking Basics', '🏦', 'banking'),
('farming-finances', 'Farming Finances', '🚜', 'farming'),
('household-budgeting', 'Household Budgeting', '🏠', 'budgeting'),
('student-finances', 'Student Finances', '🎓', 'student');

-- Seed banking topics
INSERT INTO public.learning_topics (module_id, slug, title, duration, sort_order)
SELECT m.id, 'open-bank-account', 'How to open a bank account', '5 min', 1
FROM public.learning_modules m WHERE m.slug = 'banking-basics';

INSERT INTO public.learning_topics (module_id, slug, title, duration, sort_order)
SELECT m.id, 'use-atm', 'How to use an ATM', '4 min', 2
FROM public.learning_modules m WHERE m.slug = 'banking-basics';

INSERT INTO public.learning_topics (module_id, slug, title, duration, sort_order)
SELECT m.id, 'deposit-withdraw', 'How to deposit/withdraw money', '6 min', 3
FROM public.learning_modules m WHERE m.slug = 'banking-basics';

INSERT INTO public.learning_topics (module_id, slug, title, duration, sort_order)
SELECT m.id, 'understanding-fraud', 'Understanding fraud', '5 min', 4
FROM public.learning_modules m WHERE m.slug = 'banking-basics';

INSERT INTO public.learning_topics (module_id, slug, title, duration, sort_order)
SELECT m.id, 'upi-voice-guidance', 'UPI with voice guidance', 'Interactive', 5
FROM public.learning_modules m WHERE m.slug = 'banking-basics';

INSERT INTO public.learning_topics (module_id, slug, title, duration, sort_order)
SELECT m.id, 'understanding-loans', 'Understanding Loans', '6 min', 6
FROM public.learning_modules m WHERE m.slug = 'banking-basics';
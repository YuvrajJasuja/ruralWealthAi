import { Volume2, Home, Trophy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const LearningHub = () => {
  const modules = [
    {
      title: "Banking Basics",
      progress: 67,
      completed: "4 of 6 Topics Learned",
      icon: "🏦",
      locked: false,
    },
    {
      title: "Farming Finances",
      progress: 100,
      completed: "Completed!",
      icon: "🚜",
      locked: false,
    },
    {
      title: "Household Budgeting",
      progress: 14,
      completed: "1 of 7 Topics Learned",
      icon: "🏠",
      locked: false,
    },
    {
      title: "Student Finances",
      progress: 0,
      completed: "0 of 4 Topics Learned",
      icon: "🎓",
      locked: false,
    },
  ];

  const achievements = [
    { name: "Banking Beginner", icon: "🏦", unlocked: true },
    { name: "Farming Finance Pro", icon: "🌾", unlocked: true },
    { name: "Budgeting Master", icon: "💰", unlocked: false },
    { name: "Savings Star", icon: "⭐", unlocked: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/20">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏛️</div>
              <h1 className="text-3xl font-bold">Your Learning Journey</h1>
            </div>
            <p className="text-white/90 mt-2">Track your progress and see how far you've come!</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overall Progress */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Overall Progress</h2>
                    <p className="text-muted-foreground">You've completed 65% of your financial training!</p>
                  </div>
                  <Button className="gap-2 bg-secondary text-white">
                    <Volume2 className="w-4 h-4" />
                    Continue Learning
                  </Button>
                </div>
                <Progress value={65} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">Keep going! You're doing great!</p>
              </Card>

              {/* Learning Modules */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Learning Modules</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {modules.map((module, index) => (
                    <Card
                      key={index}
                      className={`p-6 hover:shadow-lg transition-all ${
                        module.progress === 100 ? "bg-secondary/10 border-secondary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl">{module.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.completed}</p>
                        </div>
                        {module.progress === 100 && (
                          <div className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                            ✓ Done
                          </div>
                        )}
                      </div>
                      <Progress value={module.progress} className="mb-3" />
                      <Button variant="outline" className="w-full" size="sm">
                        {module.progress === 0 ? "Start Module" : "Continue"}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Topic Details */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Banking Basics (4 of 6 Topics)</h3>
                <div className="space-y-3">
                  {[
                    { title: "Understanding Bank Accounts", completed: true },
                    { title: "How to Use an ATM", completed: true },
                    { title: "Introduction to Savings", completed: true },
                    { title: "Digital Banking Safety", completed: true },
                    { title: "Understanding Loans", completed: false },
                    { title: "Building Credit", completed: false },
                  ].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          topic.completed
                            ? "bg-secondary text-white"
                            : "bg-muted-foreground/20"
                        }`}
                      >
                        {topic.completed ? "✓" : "○"}
                      </div>
                      <span className={topic.completed ? "text-foreground" : "text-muted-foreground"}>
                        {topic.title}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Your Achievements</h3>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg text-center ${
                        achievement.unlocked
                          ? "bg-secondary/20 border-2 border-secondary"
                          : "bg-muted opacity-50"
                      }`}
                    >
                      <div className="text-4xl mb-2">
                        {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 mx-auto" />}
                      </div>
                      <p className="text-xs font-medium">{achievement.name}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Help Section */}
              <Card className="p-6 bg-accent text-white">
                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                <p className="text-sm mb-4 text-white/90">
                  Confused about a term? Use our quick glossary.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="secondary" size="sm">
                    📖 e.g., Interest?
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Ask AI Guide
                  </Button>
                </div>
              </Card>

              {/* Language Support */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-2">Language</h3>
                <select className="w-full px-4 py-2 rounded-lg border bg-card">
                  <option>Hindi/English</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Marathi</option>
                  <option>Bengali</option>
                  <option>Tamil</option>
                </select>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningHub;

import { Volume2, Home, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { useAuth } from "@/hooks/useAuth";

const Banking = () => {
  const { user } = useAuth();
  const { getTopicsByModuleSlug, markTopicAsListened, isTopicCompleted, loading } = useLearningProgress();
  
  const topics = getTopicsByModuleSlug('banking-basics');

  const getColorClass = (index: number) => {
    const colors = ['bg-primary', 'bg-accent', 'bg-secondary', 'bg-terracotta', 'bg-primary'];
    return colors[index % colors.length];
  };

  const handleListen = async (topicId: string) => {
    await markTopicAsListened(topicId);
    // Here you could also trigger actual audio playback
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-muted to-muted/50 py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-4xl">🌾</div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Banking System Understanding
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground mb-6">
                  Simplify your banking with audio guidance in your language.
                </p>
                <div className="flex gap-3">
                  <Button className="gap-2 bg-primary text-white">
                    <Volume2 className="w-4 h-4" />
                    Start Audio Tour
                  </Button>
                  <select className="px-4 py-2 rounded-lg border border-input bg-card">
                    <option>Hindi</option>
                    <option>English</option>
                    <option>Marathi</option>
                    <option>Bengali</option>
                    <option>Tamil</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-9xl">👨‍🌾</div>
              </div>
            </div>
          </div>
        </section>

        {/* Banking Modules */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Learn Banking Step-by-Step
            </h2>
            
            {!user && (
              <Card className="p-4 mb-6 bg-accent/10 border-accent">
                <p className="text-sm text-muted-foreground">
                  <Link to="/auth" className="text-accent font-medium hover:underline">Login</Link> to track your learning progress!
                </p>
              </Card>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              {loading ? (
                <p className="text-muted-foreground">Loading modules...</p>
              ) : topics.length > 0 ? (
                topics.map((topic, index) => {
                  const completed = isTopicCompleted(topic.id);
                  return (
                    <Card
                      key={topic.id}
                      className={`${getColorClass(index)} text-white p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer relative`}
                    >
                      {completed && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">
                            {index === 0 && '🏦'}
                            {index === 1 && '🏧'}
                            {index === 2 && '💰'}
                            {index === 3 && '🛡️'}
                            {index === 4 && '📱'}
                            {index === 5 && '💳'}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-1">{topic.title}</h3>
                            <p className="text-white/90 text-sm">Duration: {topic.duration || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        className="w-full gap-2 mt-4"
                        onClick={() => handleListen(topic.id)}
                        disabled={loading}
                      >
                        <Volume2 className="w-4 h-4" />
                        {completed ? 'Listen Again' : `Listen in Hindi (${topic.duration || 'N/A'})`}
                      </Button>
                    </Card>
                  );
                })
              ) : (
                // Fallback static content
                [
                  { title: "How to open a bank account", icon: "🏦", duration: "5 min", color: "bg-primary" },
                  { title: "How to use an ATM", icon: "🏧", duration: "4 min", color: "bg-accent" },
                  { title: "How to deposit/withdraw money", icon: "💰", duration: "6 min", color: "bg-secondary" },
                  { title: "Understanding fraud", icon: "🛡️", duration: "5 min", color: "bg-terracotta" },
                  { title: "UPI with voice guidance", icon: "📱", duration: "Interactive", color: "bg-primary" },
                ].map((module, index) => (
                  <Card
                    key={index}
                    className={`${module.color} text-white p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{module.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{module.title}</h3>
                          <p className="text-white/90 text-sm">Duration: {module.duration}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" className="w-full gap-2 mt-4">
                      <Volume2 className="w-4 h-4" />
                      Listen in Hindi ({module.duration})
                    </Button>
                  </Card>
                ))
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="text-4xl mb-3">📞</div>
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Call our helpline for personal guidance
                </p>
                <p className="font-bold mt-2">1800-XXX-XXXX</p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold mb-2">Practice Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Try interactive simulations
                </p>
              </Card>
              
              <Link to="/learning-hub">
                <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-bold mb-2">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    See what you've learned
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Banking;

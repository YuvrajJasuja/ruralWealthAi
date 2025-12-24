import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: "question" | "answer";
  content: string;
}

const Reply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  
  const initialQuestion = location.state?.question || "";

  const fetchAnswer = async (question: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { message: question },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { type: "answer", content: data.answer }]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get answer",
        variant: "destructive",
      });
      setMessages(prev => [...prev, { type: "answer", content: "Sorry, I couldn't get an answer. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialQuestion) {
      navigate("/");
      return;
    }

    setMessages([{ type: "question", content: initialQuestion }]);
    fetchAnswer(initialQuestion);
  }, [initialQuestion, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() && !loading) {
      setMessages(prev => [...prev, { type: "question", content: newQuestion.trim() }]);
      fetchAnswer(newQuestion.trim());
      setNewQuestion("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          <div className="space-y-6 mb-8">
            {messages.map((message, index) => (
              message.type === "question" ? (
                <div key={index} className="bg-secondary/10 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Your Question</p>
                      <p className="text-lg font-medium text-foreground">{message.content}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="bg-card rounded-xl p-6 shadow-lg border">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">AI</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">Answer</p>
                      <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            ))}

            {loading && (
              <div className="bg-card rounded-xl p-6 shadow-lg border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">AI</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ask another question */}
          <form onSubmit={handleSubmit} className="sticky bottom-4 bg-background p-4 rounded-xl border shadow-lg">
            <div className="flex gap-3">
              <Input
                placeholder="Ask another question..."
                className="h-12 text-base bg-card flex-1"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" size="lg" className="h-12 px-6" disabled={!newQuestion.trim() || loading}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reply;

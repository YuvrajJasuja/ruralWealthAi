import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Reply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(true);
  
  const question = location.state?.question || "";

  useEffect(() => {
    if (!question) {
      navigate("/");
      return;
    }

    const fetchAnswer = async () => {
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

        setAnswer(data.answer);
      } catch (error) {
        console.error("Error fetching answer:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to get answer",
          variant: "destructive",
        });
        setAnswer("Sorry, I couldn't get an answer. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [question, navigate, toast]);

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
            Ask another question
          </Button>

          <div className="space-y-6">
            {/* Question */}
            <div className="bg-secondary/10 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Question</p>
                  <p className="text-lg font-medium text-foreground">{question}</p>
                </div>
              </div>
            </div>

            {/* Answer */}
            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Answer</p>
                  {loading ? (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  ) : (
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reply;

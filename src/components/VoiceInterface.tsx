import { Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VoiceInterface = () => {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-end mb-6">
          <Button variant="outline" className="gap-2 bg-card shadow-sm">
            <Volume2 className="w-4 h-4" />
            Listen to instructions
          </Button>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Microphone Visual */}
          <div className="relative">
            <div className="absolute inset-0 animate-pulse">
              <div className="w-48 h-48 rounded-full bg-secondary/20"></div>
            </div>
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer">
              <div className="w-40 h-40 rounded-full bg-card flex items-center justify-center">
                <Mic className="w-20 h-20 text-secondary" />
              </div>
            </div>
            {/* Sound waves */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-secondary/40 rounded-full animate-pulse"
                    style={{
                      height: `${20 + i * 10}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-accent/40 rounded-full animate-pulse"
                    style={{
                      height: `${20 + (3 - i) * 10}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Press to Speak. Ask about your finances or farm.
            </h2>
            <p className="text-muted-foreground text-lg">
              Or type your question here.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <Input
              placeholder="Type your question..."
              className="h-14 text-lg bg-card shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceInterface;

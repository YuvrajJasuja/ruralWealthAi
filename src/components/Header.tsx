import { Home, User, HelpCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b-2 border-primary/20 bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🌾</div>
            <h1 className="text-2xl font-bold">
              <span className="text-foreground">Rural</span>
              <span className="text-secondary">Wealth</span>
              <span className="text-accent"> AI</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="gap-2 text-base font-medium">
              <Home className="w-5 h-5" />
              Home
            </Button>
            <Button variant="ghost" className="gap-2 text-base font-medium">
              <User className="w-5 h-5" />
              Profile
            </Button>
            <Button variant="ghost" className="gap-2 text-base font-medium">
              <HelpCircle className="w-5 h-5" />
              Help
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 font-medium">
              🌐 English (Local Support)
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Home, User, HelpCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b-2 border-primary/20 bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="text-3xl">🌾</div>
            <h1 className="text-2xl font-bold">
              <span className="text-foreground">Rural</span>
              <span className="text-secondary">Wealth</span>
              <span className="text-accent"> AI</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                className="gap-2 text-base font-medium"
              >
                <Home className="w-5 h-5" />
                Home
              </Button>
            </Link>
            <Link to="/banking">
              <Button 
                variant={isActive("/banking") ? "default" : "ghost"} 
                className="gap-2 text-base font-medium"
              >
                🏦 Banking
              </Button>
            </Link>
            <Link to="/farming">
              <Button 
                variant={isActive("/farming") ? "default" : "ghost"} 
                className="gap-2 text-base font-medium"
              >
                🚜 Farming
              </Button>
            </Link>
            <Link to="/student">
              <Button 
                variant={isActive("/student") ? "default" : "ghost"} 
                className="gap-2 text-base font-medium"
              >
                🎓 Student
              </Button>
            </Link>
            <Link to="/learning-hub">
              <Button 
                variant={isActive("/learning-hub") ? "default" : "ghost"} 
                className="gap-2 text-base font-medium"
              >
                📚 Learning Hub
              </Button>
            </Link>
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

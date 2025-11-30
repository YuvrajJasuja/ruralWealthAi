import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-2 border-primary/20 bg-card py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex gap-6 text-sm">
            <a href="#" className="text-foreground hover:text-secondary transition-colors">
              About Us
            </a>
            <a href="#" className="text-foreground hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground hover:text-secondary transition-colors">
              Contact Support
            </a>
          </nav>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="w-5 h-5 text-secondary" />
            <span className="font-medium">
              Local language support available via audio for all features.
            </span>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Empowering rural communities with accessible financial knowledge</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

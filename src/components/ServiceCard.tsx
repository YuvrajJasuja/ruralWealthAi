import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent" | "terracotta";
}

const colorClasses = {
  primary: "bg-primary hover:bg-primary/90",
  secondary: "bg-secondary hover:bg-secondary/90",
  accent: "bg-accent hover:bg-accent/90",
  terracotta: "bg-terracotta hover:bg-terracotta/90",
};

const ServiceCard = ({ icon, title, description, color }: ServiceCardProps) => {
  return (
    <Card className="p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="text-6xl mb-2">{icon}</div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <Button className={`w-full gap-2 text-white ${colorClasses[color]}`}>
        <Volume2 className="w-4 h-4" />
        Play Audio Info
      </Button>
    </Card>
  );
};

export default ServiceCard;

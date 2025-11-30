import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";

const ServicesGrid = () => {
  const services = [
    {
      icon: "🏦",
      title: "Banking Services",
      description: "Check balance, send money, save.",
      color: "primary" as const,
      link: "/banking",
    },
    {
      icon: "🚜",
      title: "Farm Management",
      description: "Market prices, weather, expert tips.",
      color: "secondary" as const,
      link: "/farming",
    },
    {
      icon: "🎓",
      title: "Student Support",
      description: "Scholarships, education loans.",
      color: "accent" as const,
      link: "/student",
    },
    {
      icon: "🏠",
      title: "Learning Hub",
      description: "Track progress, view achievements.",
      color: "terracotta" as const,
      link: "/learning-hub",
    },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <ServiceCard {...service} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

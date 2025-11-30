import ServiceCard from "./ServiceCard";

const ServicesGrid = () => {
  const services = [
    {
      icon: "🏦",
      title: "Banking Services",
      description: "Check balance, send money, save.",
      color: "primary" as const,
    },
    {
      icon: "🚜",
      title: "Farm Management",
      description: "Market prices, weather, expert tips.",
      color: "secondary" as const,
    },
    {
      icon: "🎓",
      title: "Student Support",
      description: "Scholarships, education loans.",
      color: "accent" as const,
    },
    {
      icon: "🏠",
      title: "Household Budget",
      description: "Track expenses, pay bills.",
      color: "terracotta" as const,
    },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

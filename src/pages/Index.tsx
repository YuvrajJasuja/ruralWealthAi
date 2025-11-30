import Header from "@/components/Header";
import VoiceInterface from "@/components/VoiceInterface";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <VoiceInterface />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

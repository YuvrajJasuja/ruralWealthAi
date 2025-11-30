import { Volume2, Home, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Farming = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Welcome Banner */}
        <section className="bg-primary text-white py-6 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/20">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <span className="text-lg">
                Welcome back, <span className="font-bold">Farmer</span>. Your AI financial assistant is ready.
              </span>
            </div>
            <Button variant="secondary" className="gap-2">
              <Volume2 className="w-4 h-4" />
              Play Daily Briefing
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Kisan Credit Card */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Kisan Credit Card (KCC)</h2>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-5xl">💳</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Your current KCC limit is ₹3,00,000.</p>
                      <p className="text-sm text-muted-foreground">Next renewal date: 15 Oct.</p>
                      <a href="#" className="text-secondary text-sm underline">Learn about low-interest options.</a>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium">Loan balance info:</p>
                    <p className="text-lg font-bold">Your currents ₹3,00,000</p>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Volume2 className="w-4 h-4" />
                  Listen to KCC Advice
                </Button>
              </div>
            </Card>

            {/* Farming Profit/Loss */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Farming Profit/Loss</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">📊</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Projected Kharif Profit: ₹55,000.</p>
                      <p className="text-sm text-muted-foreground">Expense tracking shows slight increase.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg mb-3">
                    <p className="text-xs text-muted-foreground mb-2">Seasonal Income vs. Expenses</p>
                    <div className="flex gap-2 h-24 items-end">
                      <div className="bg-accent flex-1 rounded-t-lg" style={{height: '60%'}}></div>
                      <div className="bg-secondary flex-1 rounded-t-lg" style={{height: '80%'}}></div>
                      <div className="bg-terracotta flex-1 rounded-t-lg" style={{height: '90%'}}></div>
                    </div>
                  </div>
                </div>
                <Button className="gap-2 bg-accent text-white">
                  <Volume2 className="w-4 h-4" />
                  Listen to Financial Analysis
                </Button>
              </div>
            </Card>

            {/* Crop Insurance */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Crop Insurance</h2>
              <div className="flex items-start gap-4">
                <div className="flex gap-2 text-4xl">
                  <span>🌾</span>
                  <span>🌱</span>
                  <span>🌿</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Active Policy for Kharif 2024.</p>
                  <p className="text-sm text-muted-foreground mb-4">Claim status: In Progress.</p>
                  <Button variant="outline" className="w-full gap-2">
                    <Volume2 className="w-4 h-4" />
                    Listen to Claim Process
                  </Button>
                </div>
              </div>
            </Card>

            {/* Mandi Price Updates */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Mandi Price Updates</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌾</span>
                        <div>
                          <p className="font-bold">Wheat (Local Mandi)</p>
                          <p className="text-sm text-muted-foreground">₹2,150/quintal</p>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌾</span>
                        <div>
                          <p className="font-bold">Rice (District Mandi)</p>
                          <p className="text-sm text-muted-foreground">₹3,200/quintal</p>
                        </div>
                      </div>
                      <TrendingDown className="w-5 h-5 text-destructive" />
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="gap-2 ml-4">
                  <Volume2 className="w-4 h-4" />
                  Listen to Market Trends
                </Button>
              </div>
            </Card>

            {/* Government Schemes */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Government Subsidy Schemes</h2>
                  <div className="space-y-2">
                    <a href="#" className="block text-secondary underline">PM-KISAN installment status</a>
                    <a href="#" className="block text-secondary underline">Soil Health Card Scheme details</a>
                    <a href="#" className="block text-secondary underline">Solar Pump Subsidy application</a>
                  </div>
                </div>
                <Button className="gap-2 bg-terracotta text-white">
                  <Volume2 className="w-4 h-4" />
                  Listen to Scheme Eligibility
                </Button>
              </div>
            </Card>

            {/* Budgeting Tips */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Budgeting for Farming</h2>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent via-secondary to-terracotta flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-card"></div>
                    </div>
                    <div>
                      <p className="font-bold mb-2">Recommended Allocation:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Seeds (20%), Fertilizers (30%)</li>
                        <li>• Labor (25%), Machinery (15%)</li>
                        <li>• Other (10%)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Button className="gap-2 bg-secondary text-white">
                  <Volume2 className="w-4 h-4" />
                  Listen to Budgeting Tips
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Farming;

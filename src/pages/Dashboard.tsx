import { Navigation } from "@/components/ui/navigation";
import { Dashboard as DashboardComponent } from "@/components/ui/dashboard";
import { Footer } from "@/components/ui/footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <DashboardComponent />
      <Footer />
    </div>
  );
};

export default Dashboard;
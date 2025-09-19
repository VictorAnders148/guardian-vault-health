import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Share2, 
  Lock, 
  Unlock, 
  Heart, 
  Brain, 
  Activity,
  Eye,
  ShieldCheck
} from "lucide-react";

interface MedicalRecord {
  id: string;
  title: string;
  type: "lab" | "imaging" | "prescription" | "consultation";
  date: string;
  doctor: string;
  status: "encrypted" | "shared" | "accessing";
  urgency: "low" | "medium" | "high";
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    title: "Blood Work Panel - Complete",
    type: "lab",
    date: "2024-01-15",
    doctor: "Dr. Sarah Chen",
    status: "encrypted",
    urgency: "medium"
  },
  {
    id: "2", 
    title: "MRI Brain Scan",
    type: "imaging",
    date: "2024-01-12",
    doctor: "Dr. Michael Torres",
    status: "shared",
    urgency: "high"
  },
  {
    id: "3",
    title: "Cardiology Consultation",
    type: "consultation", 
    date: "2024-01-10",
    doctor: "Dr. Amanda Rivera",
    status: "accessing",
    urgency: "medium"
  },
  {
    id: "4",
    title: "Prescription: Metformin",
    type: "prescription",
    date: "2024-01-08",
    doctor: "Dr. James Park",
    status: "encrypted",
    urgency: "low"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "encrypted": return <Lock className="w-4 h-4 text-accent glow-accent" />;
    case "shared": return <Share2 className="w-4 h-4 text-success glow-success" />;
    case "accessing": return <Eye className="w-4 h-4 text-warning" />;
    default: return <Lock className="w-4 h-4 text-accent" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "lab": return <Activity className="w-5 h-5 text-primary" />;
    case "imaging": return <Brain className="w-5 h-5 text-primary" />;
    case "consultation": return <Heart className="w-5 h-5 text-primary" />;
    case "prescription": return <FileText className="w-5 h-5 text-primary" />;
    default: return <FileText className="w-5 h-5 text-primary" />;
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high": return "bg-destructive text-destructive-foreground";
    case "medium": return "bg-warning text-warning-foreground";
    case "low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export const Dashboard = () => {
  return (
    <section className="min-h-screen bg-background py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Medical Records Dashboard
          </h2>
          <p className="text-xl text-muted-foreground">
            Manage encrypted health data with blockchain-secured privacy controls
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="glow-primary transition-smooth hover:scale-105">
            <CardContent className="p-6 text-center">
              <ShieldCheck className="w-8 h-8 text-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">4</h3>
              <p className="text-muted-foreground">Encrypted Records</p>
            </CardContent>
          </Card>
          
          <Card className="glow-accent transition-smooth hover:scale-105">
            <CardContent className="p-6 text-center">
              <Share2 className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">2</h3>
              <p className="text-muted-foreground">Shared Accesses</p>
            </CardContent>
          </Card>
          
          <Card className="glow-success transition-smooth hover:scale-105">
            <CardContent className="p-6 text-center">
              <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">3</h3>
              <p className="text-muted-foreground">Doctors Connected</p>
            </CardContent>
          </Card>
          
          <Card className="transition-smooth hover:scale-105">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-warning mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">100%</h3>
              <p className="text-muted-foreground">Privacy Protected</p>
            </CardContent>
          </Card>
        </div>

        {/* Records List */}
        <div className="grid gap-6">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Recent Medical Records</h3>
          
          {mockRecords.map((record) => (
            <Card key={record.id} className="transition-smooth hover:glow-primary animate-encrypt-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getTypeIcon(record.type)}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{record.title}</h4>
                      <p className="text-muted-foreground">Dr. {record.doctor} • {record.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getUrgencyColor(record.urgency)}>
                      {record.urgency}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className="text-sm text-muted-foreground capitalize">
                        {record.status}
                      </span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant={record.status === "encrypted" ? "default" : "outline"}
                      className="transition-bounce"
                    >
                      {record.status === "encrypted" ? <Unlock className="w-4 h-4 mr-2" /> : null}
                      {record.status === "encrypted" ? "Grant Access" : "Manage"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
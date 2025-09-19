import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Footer } from "@/components/ui/footer";
import { 
  Share2, 
  Shield, 
  Clock,
  User,
  FileText,
  Lock,
  Unlock,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

interface MedicalRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    title: "Blood Work Panel - Complete",
    type: "Lab Results",
    date: "2024-01-15",
    doctor: "Dr. Sarah Chen"
  },
  {
    id: "2", 
    title: "MRI Brain Scan",
    type: "Medical Imaging",
    date: "2024-01-12",
    doctor: "Dr. Michael Torres"
  },
  {
    id: "3",
    title: "Cardiology Consultation",
    type: "Consultation Notes", 
    date: "2024-01-10",
    doctor: "Dr. Amanda Rivera"
  }
];

const GrantAccess = () => {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [doctorAddress, setDoctorAddress] = useState("");
  const [accessDuration, setAccessDuration] = useState("24");
  const [isGranting, setIsGranting] = useState(false);

  const handleRecordSelect = (recordId: string) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleGrantAccess = () => {
    if (selectedRecords.length === 0 || !doctorAddress) {
      alert("Please select records and enter doctor's wallet address");
      return;
    }

    setIsGranting(true);
    
    // Mock granting process
    setTimeout(() => {
      setIsGranting(false);
      alert(`Access granted successfully to ${selectedRecords.length} record(s) for ${accessDuration} hours!`);
      setSelectedRecords([]);
      setDoctorAddress("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Grant Access
            </h1>
            <p className="text-xl text-muted-foreground">
              Authorize healthcare providers to access specific medical records
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Record Selection */}
            <Card className="glow-primary transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <span>Select Records</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecords.map((record) => (
                  <div 
                    key={record.id}
                    className={`p-4 border rounded-lg transition-smooth cursor-pointer ${
                      selectedRecords.includes(record.id) 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleRecordSelect(record.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        checked={selectedRecords.includes(record.id)}
                        onChange={() => handleRecordSelect(record.id)}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{record.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {record.type} • {record.doctor} • {record.date}
                        </p>
                      </div>
                      <Lock className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                ))}

                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {selectedRecords.length} record(s) selected for access
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Access Configuration */}
            <Card className="glow-accent transition-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Share2 className="w-6 h-6 text-accent" />
                  <span>Access Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Doctor's Wallet Address */}
                <div className="space-y-2">
                  <Label htmlFor="doctorAddress">Doctor's Wallet Address</Label>
                  <Input 
                    id="doctorAddress"
                    placeholder="0x742d35Cc6466C4E7C7db3B...A23B1c"
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the healthcare provider's verified wallet address
                  </p>
                </div>

                {/* Access Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Access Duration (Hours)</Label>
                  <Input 
                    id="duration"
                    type="number"
                    min="1"
                    max="168"
                    value={accessDuration}
                    onChange={(e) => setAccessDuration(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum 168 hours (7 days)
                  </p>
                </div>

                {/* Access Type */}
                <div className="space-y-3">
                  <Label>Access Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <span className="text-sm">View Records</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Download Files</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <span className="text-sm">Add Notes</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-warning">Security Notice</h4>
                      <p className="text-sm text-warning/80 mt-1">
                        Access will be automatically revoked after the specified duration. 
                        You can revoke access manually at any time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grant Access Button */}
                <Button 
                  onClick={handleGrantAccess}
                  className="w-full bg-gradient-accent glow-accent text-lg py-6" 
                  size="lg"
                  disabled={isGranting || selectedRecords.length === 0 || !doctorAddress}
                >
                  {isGranting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Granting Access...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5 mr-2" />
                      Grant Access ({selectedRecords.length} records)
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Access Grants */}
          <Card className="mt-8 glow-success transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success" />
                <span>Active Access Grants</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-success/20 bg-success/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">Dr. Michael Torres</h4>
                      <p className="text-sm text-muted-foreground">
                        0x892f35Cc6466C4E7C7db3B...B43C2d
                      </p>
                      <p className="text-sm text-success">
                        Access to MRI Brain Scan • Expires in 18 hours
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive">
                      Revoke
                    </Button>
                  </div>
                </div>

                <div className="text-center p-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No other active access grants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GrantAccess;
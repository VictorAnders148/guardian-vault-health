import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/ui/footer";
import { 
  FileText, 
  Upload, 
  Shield, 
  Lock,
  Calendar,
  User,
  Heart,
  Brain,
  Activity,
  Stethoscope
} from "lucide-react";
import { useState } from "react";

const NewRecord = () => {
  const [recordType, setRecordType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Mock upload process
    setTimeout(() => {
      setIsUploading(false);
      alert("Medical record encrypted and stored successfully!");
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lab": return <Activity className="w-5 h-5 text-primary" />;
      case "imaging": return <Brain className="w-5 h-5 text-primary" />;
      case "consultation": return <Heart className="w-5 h-5 text-primary" />;
      case "prescription": return <FileText className="w-5 h-5 text-primary" />;
      default: return <Stethoscope className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              New Medical Records
            </h1>
            <p className="text-xl text-muted-foreground">
              Securely upload and encrypt your medical data on the blockchain
            </p>
          </div>

          <Card className="glow-primary transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary" />
                <span>Upload Medical Record</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Record Type */}
                <div className="space-y-2">
                  <Label htmlFor="recordType">Record Type</Label>
                  <Select value={recordType} onValueChange={setRecordType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select record type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lab">Lab Results</SelectItem>
                      <SelectItem value="imaging">Medical Imaging</SelectItem>
                      <SelectItem value="consultation">Consultation Notes</SelectItem>
                      <SelectItem value="prescription">Prescription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Record Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Blood Work Panel - Complete" 
                    required 
                  />
                </div>

                {/* Doctor */}
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor/Provider</Label>
                  <Input 
                    id="doctor" 
                    placeholder="Dr. Sarah Chen" 
                    required 
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    required 
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description/Notes</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Additional notes or description..." 
                    rows={4}
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">Upload Files</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Drag & drop files here, or click to select
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.dcm"
                      className="hidden"
                      id="file-upload"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-3 mb-2">
                    <Lock className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold text-foreground">End-to-End Encryption</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your medical records will be encrypted using advanced cryptography before being stored on the blockchain. 
                    Only you can decrypt and grant access to authorized healthcare providers.
                  </p>
                </div>

                {/* Preview Selected Type */}
                {recordType && (
                  <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    {getTypeIcon(recordType)}
                    <span className="text-sm text-primary font-medium">
                      Selected: {recordType === "lab" ? "Lab Results" : 
                               recordType === "imaging" ? "Medical Imaging" :
                               recordType === "consultation" ? "Consultation Notes" : "Prescription"}
                    </span>
                    <Badge variant="outline" className="text-primary border-primary">
                      Encrypted
                    </Badge>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary glow-primary text-lg py-6" 
                  size="lg"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Encrypting & Uploading...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Encrypt & Store Record
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewRecord;
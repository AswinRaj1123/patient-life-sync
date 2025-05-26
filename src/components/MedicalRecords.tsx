
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MedicalRecords = () => {
  const [records] = useState([
    {
      id: 1,
      title: "Blood Test Results",
      type: "Lab Report",
      date: "2024-01-10",
      doctor: "Dr. Sarah Johnson",
      status: "Normal",
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "Chest X-Ray",
      type: "Imaging",
      date: "2024-01-08",
      doctor: "Dr. Michael Chen",
      status: "Clear",
      fileSize: "8.1 MB"
    },
    {
      id: 3,
      title: "Prescription - Hypertension",
      type: "Prescription",
      date: "2024-01-05",
      doctor: "Dr. Sarah Johnson",
      status: "Active",
      fileSize: "180 KB"
    },
    {
      id: 4,
      title: "Annual Physical Exam",
      type: "Report",
      date: "2024-01-03",
      doctor: "Dr. Michael Chen",
      status: "Complete",
      fileSize: "1.2 MB"
    },
    {
      id: 5,
      title: "Cardiology Consultation",
      type: "Consultation",
      date: "2023-12-28",
      doctor: "Dr. Sarah Johnson",
      status: "Follow-up Required",
      fileSize: "3.7 MB"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'clear':
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'follow-up required':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lab report':
        return '🧪';
      case 'imaging':
        return '📸';
      case 'prescription':
        return '💊';
      case 'report':
        return '📋';
      case 'consultation':
        return '👩‍⚕️';
      default:
        return '📄';
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Medical Records</span>
        </CardTitle>
        <CardDescription>
          View and manage your medical documents, test results, and prescriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="border-blue-100 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getTypeIcon(record.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{record.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{record.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{record.doctor}</span>
                        </span>
                        <span>{record.fileSize}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {record.type}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(record.status)}`}>
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast({ title: "Opening preview..." })}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      onClick={() => toast({ title: "Downloading file..." })}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {records.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No records found</h3>
            <p className="text-gray-500">Upload your first medical record to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicalRecords;

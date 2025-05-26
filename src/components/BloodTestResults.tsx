
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Calendar, User, TestTube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BloodTestResultsProps {
  onBack: () => void;
}

const BloodTestResults = ({ onBack }: BloodTestResultsProps) => {
  const bloodTestData = [
    { test: "Hemoglobin", result: "14.2", unit: "g/dL", reference: "12.0-16.0", status: "Normal" },
    { test: "White Blood Cells", result: "6.8", unit: "×10³/μL", reference: "4.0-11.0", status: "Normal" },
    { test: "Red Blood Cells", result: "4.5", unit: "×10⁶/μL", reference: "4.2-5.4", status: "Normal" },
    { test: "Platelets", result: "285", unit: "×10³/μL", reference: "150-450", status: "Normal" },
    { test: "Glucose", result: "95", unit: "mg/dL", reference: "70-100", status: "Normal" },
    { test: "Cholesterol Total", result: "195", unit: "mg/dL", reference: "<200", status: "Normal" },
    { test: "HDL Cholesterol", result: "58", unit: "mg/dL", reference: ">40", status: "Good" },
    { test: "LDL Cholesterol", result: "115", unit: "mg/dL", reference: "<100", status: "Borderline" },
    { test: "Triglycerides", result: "110", unit: "mg/dL", reference: "<150", status: "Normal" },
    { test: "Creatinine", result: "0.9", unit: "mg/dL", reference: "0.6-1.2", status: "Normal" }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'borderline':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <TestTube className="w-5 h-5 text-blue-600" />
                <CardTitle>Blood Test Results</CardTitle>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-green-600"
              onClick={() => toast({ title: "Downloading blood test results..." })}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
          <CardDescription>
            Comprehensive blood panel analysis - January 10, 2024
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Information */}
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Test Date</p>
                <p className="text-sm text-gray-600">January 10, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Ordered By</p>
                <p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TestTube className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Lab ID</p>
                <p className="text-sm text-gray-600">BT-2024-001</p>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Reference Range</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bloodTestData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.test}</TableCell>
                      <TableCell className="font-semibold">{item.result}</TableCell>
                      <TableCell className="text-gray-600">{item.unit}</TableCell>
                      <TableCell className="text-gray-600">{item.reference}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span className="text-green-600">📋</span>
                <span>Summary & Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  <strong>Overall Status:</strong> Most values are within normal ranges. 
                  LDL cholesterol is slightly elevated and should be monitored.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Recommendations:</strong>
                </p>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li>Continue current dietary habits and exercise routine</li>
                  <li>Consider reducing saturated fat intake to help lower LDL cholesterol</li>
                  <li>Follow-up blood work in 3 months</li>
                  <li>Schedule appointment with Dr. Johnson to discuss results</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodTestResults;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Calendar, User, Pill, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PrescriptionViewProps {
  onBack: () => void;
}

const PrescriptionView = ({ onBack }: PrescriptionViewProps) => {
  const medications = [
    {
      name: "Lisinopril",
      strength: "10mg",
      dosage: "Once daily",
      quantity: "30 tablets",
      refills: "2",
      instructions: "Take with or without food. Best taken at the same time each day."
    },
    {
      name: "Metformin",
      strength: "500mg",
      dosage: "Twice daily",
      quantity: "60 tablets",
      refills: "3",
      instructions: "Take with meals to reduce stomach upset."
    },
    {
      name: "Atorvastatin",
      strength: "20mg",
      dosage: "Once daily at bedtime",
      quantity: "30 tablets",
      refills: "5",
      instructions: "Take in the evening. Avoid grapefruit juice."
    }
  ];

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
                <Pill className="w-5 h-5 text-blue-600" />
                <CardTitle>Prescription - Hypertension Management</CardTitle>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-green-600"
              onClick={() => toast({ title: "Downloading prescription..." })}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
          <CardDescription>
            Electronic prescription issued January 5, 2024
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prescription Header */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg">Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>John Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date of Birth:</span>
                  <span>March 15, 1979</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Patient ID:</span>
                  <span>PT-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>123 Main St, City, ST 12345</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-lg">Prescriber Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Doctor:</span>
                  <span>Dr. Sarah Johnson, MD</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">License:</span>
                  <span>MD123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">DEA:</span>
                  <span>BJ1234567</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date Prescribed:</span>
                  <span>January 5, 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medications Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Pill className="w-5 h-5 text-blue-600" />
                <span>Prescribed Medications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Strength</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Refills</TableHead>
                    <TableHead>Instructions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.strength}</TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {med.refills} remaining
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs">
                        {med.instructions}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Important Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span>Important Safety Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Allergies on File:</h4>
                  <p className="text-sm text-yellow-700">Penicillin, Shellfish</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Drug Interactions:</h4>
                  <p className="text-sm text-yellow-700">No significant interactions identified</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Monitoring Required:</h4>
                  <p className="text-sm text-yellow-700">
                    Blood pressure monitoring recommended. Liver function tests for statin therapy.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg">Pharmacy Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Pharmacy:</span>
                  <span>MediCare Pharmacy</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>456 Health Ave</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>(555) 123-MEDS</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge className="bg-green-100 text-green-800">
                    Ready for Pickup
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prescription Notes */}
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg">Clinical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  <strong>Diagnosis:</strong> Essential Hypertension (I10), Type 2 Diabetes Mellitus (E11.9), 
                  Hyperlipidemia (E78.5)
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Treatment Plan:</strong> Continue current medication regimen. Patient education 
                  provided regarding lifestyle modifications including diet and exercise. Follow-up in 3 months 
                  or sooner if concerns arise.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Next Appointment:</strong> April 5, 2024 at 10:00 AM for medication review and 
                  blood pressure check.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Electronic Signature */}
          <div className="text-center p-4 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600 mb-2">
              This prescription has been electronically signed and transmitted
            </p>
            <p className="text-xs text-gray-500">
              Dr. Sarah Johnson, MD • Digital Signature Applied: January 5, 2024 2:30 PM EST
            </p>
            <Badge className="mt-2 bg-blue-100 text-blue-800">
              Electronically Verified
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionView;

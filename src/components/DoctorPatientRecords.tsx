
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText, Calendar, User, Plus, Save, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  phone: string;
  email: string;
  emergencyContact: string;
  allergies: string[];
  medications: string[];
  notes: string[];
}

const DoctorPatientRecords = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newNote, setNewNote] = useState("");
  const [newMedication, setNewMedication] = useState("");

  const [patients] = useState<Patient[]>([
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      condition: "Hypertension",
      lastVisit: "2024-01-10",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      emergencyContact: "+1 (555) 987-6543",
      allergies: ["Penicillin", "Shellfish"],
      medications: ["Lisinopril 10mg", "Metformin 500mg"],
      notes: [
        "Patient reports improved blood pressure readings at home",
        "Recommended lifestyle changes discussed",
        "Follow-up appointment scheduled in 3 months"
      ]
    },
    {
      id: 2,
      name: "Emma Johnson",
      age: 32,
      gender: "Female",
      condition: "Diabetes Type 2",
      lastVisit: "2024-01-12",
      phone: "+1 (555) 234-5678",
      email: "emma.johnson@email.com",
      emergencyContact: "+1 (555) 876-5432",
      allergies: ["Latex"],
      medications: ["Metformin 1000mg", "Insulin glargine"],
      notes: [
        "HbA1c levels improved from last visit",
        "Patient compliant with medication regimen",
        "Discussed carbohydrate counting"
      ]
    }
  ]);

  const handleAddNote = () => {
    if (newNote.trim() && selectedPatient) {
      selectedPatient.notes.unshift(newNote);
      setNewNote("");
      toast({ title: "Note added successfully" });
    }
  };

  const handleAddMedication = () => {
    if (newMedication.trim() && selectedPatient) {
      selectedPatient.medications.push(newMedication);
      setNewMedication("");
      toast({ title: "Medication added successfully" });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Patient Records</span>
          </CardTitle>
          <CardDescription>
            View and manage detailed patient information and medical history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Patient List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Select Patient</h3>
              {patients.map((patient) => (
                <Card 
                  key={patient.id} 
                  className={`border cursor-pointer transition-all ${
                    selectedPatient?.id === patient.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-blue-100 hover:bg-blue-50'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                        <p className="text-sm text-gray-600">
                          {patient.age} years • {patient.gender}
                        </p>
                        <p className="text-sm text-gray-500">{patient.condition}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Last: {patient.lastVisit}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Patient Details */}
            {selectedPatient && (
              <div className="space-y-4">
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span>{selectedPatient.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Age:</span> {selectedPatient.age}
                      </div>
                      <div>
                        <span className="font-medium">Gender:</span> {selectedPatient.gender}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {selectedPatient.phone}
                      </div>
                      <div>
                        <span className="font-medium">Emergency:</span> {selectedPatient.emergencyContact}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Email:</span> {selectedPatient.email}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Allergies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Current Medications</h4>
                      <div className="space-y-2">
                        {selectedPatient.medications.map((medication, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {medication}
                            </Badge>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2 mt-2">
                          <Input
                            placeholder="Add new medication..."
                            value={newMedication}
                            onChange={(e) => setNewMedication(e.target.value)}
                            className="text-sm"
                          />
                          <Button size="sm" onClick={handleAddMedication}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      {selectedPatient && (
        <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Clinical Notes - {selectedPatient.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Add new clinical note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleAddNote} className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Save className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Previous Notes</h4>
              {selectedPatient.notes.map((note, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-gray-700">{note}</p>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Today</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorPatientRecords;

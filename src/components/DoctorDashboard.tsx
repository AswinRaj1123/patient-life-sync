
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, FileText, Clock, LogOut, Plus, Stethoscope } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DoctorDashboardProps {
  user: any;
  onLogout: () => void;
}

const DoctorDashboard = ({ user, onLogout }: DoctorDashboardProps) => {
  const [patients] = useState([
    {
      id: 1,
      name: "John Smith",
      age: 45,
      condition: "Hypertension",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-15"
    },
    {
      id: 2,
      name: "Emma Johnson",
      age: 32,
      condition: "Diabetes",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-01-18"
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 28,
      condition: "Regular Checkup",
      lastVisit: "2024-01-08",
      nextAppointment: "2024-01-20"
    }
  ]);

  const [todayAppointments] = useState([
    { id: 1, patient: "Sarah Wilson", time: "09:00 AM", type: "Follow-up" },
    { id: 2, patient: "David Lee", time: "10:30 AM", type: "Consultation" },
    { id: 3, patient: "Lisa Garcia", time: "02:00 PM", type: "Check-up" },
    { id: 4, patient: "Robert Taylor", time: "03:30 PM", type: "Follow-up" }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              HealthSync
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Dr. {user.name}</span>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-blue-200 hover:bg-blue-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Stethoscope className="w-6 h-6" />
              <span>Good morning, Dr. {user.name}!</span>
            </CardTitle>
            <CardDescription className="text-blue-100">
              {user.specialization && `${user.specialization} • `}
              You have {todayAppointments.length} appointments today
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{todayAppointments.length}</div>
            </CardContent>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{patients.length}</div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8</div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">12m</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-blue-100">
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Today's Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>My Patients</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                      <div>
                        <h4 className="font-semibold text-gray-800">{appointment.patient}</h4>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-blue-600">{appointment.time}</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle>My Patients</CardTitle>
                <CardDescription>Manage your patient records and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
                      <div>
                        <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                        <p className="text-sm text-gray-600">Age: {patient.age} • {patient.condition}</p>
                        <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                      </div>
                      <div className="text-right space-x-2">
                        <Button size="sm" variant="outline">
                          View Records
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                          Add Notes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>View patient reports and practice analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Patient Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
                      <p className="text-sm text-gray-600">Based on 156 reviews</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600 mb-2">124</div>
                      <p className="text-sm text-gray-600">+12% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Shield, Users, Clock, Plus } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import PatientDashboard from "@/components/PatientDashboard";
import DoctorDashboard from "@/components/DoctorDashboard";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setUserRole(userData.role);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
  };

  if (userRole === 'patient') {
    return <PatientDashboard user={user} onLogout={handleLogout} />;
  }

  if (userRole === 'doctor') {
    return <DoctorDashboard user={user} onLogout={handleLogout} />;
  }

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
          <div className="space-x-4">
            <Button 
              variant="outline" 
              onClick={() => { setAuthMode('login'); setShowAuth(true); }}
              className="border-blue-200 hover:bg-blue-50"
            >
              Login
            </Button>
            <Button 
              onClick={() => { setAuthMode('register'); setShowAuth(true); }}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Your Health, Perfectly Organized
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            HealthSync revolutionizes healthcare management with secure medical records storage, 
            seamless appointment scheduling, and real-time communication between patients and doctors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => { setAuthMode('register'); setShowAuth(true); }}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-6"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-blue-200 hover:bg-blue-50 text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Comprehensive Healthcare Management
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <FileText className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle className="text-blue-800">Secure Medical Records</CardTitle>
                <CardDescription>
                  Store, organize, and access your medical history with bank-level security
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Calendar className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle className="text-green-800">Smart Scheduling</CardTitle>
                <CardDescription>
                  Book, reschedule, and manage appointments with real-time availability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Shield className="w-10 h-10 text-purple-600 mb-2" />
                <CardTitle className="text-purple-800">HIPAA Compliant</CardTitle>
                <CardDescription>
                  Full regulatory compliance ensuring your health data stays private
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Users className="w-10 h-10 text-indigo-600 mb-2" />
                <CardTitle className="text-indigo-800">Patient-Doctor Portal</CardTitle>
                <CardDescription>
                  Seamless communication and data sharing between healthcare providers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Clock className="w-10 h-10 text-orange-600 mb-2" />
                <CardTitle className="text-orange-800">Real-time Updates</CardTitle>
                <CardDescription>
                  Get instant notifications for appointments, results, and prescriptions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Plus className="w-10 h-10 text-pink-600 mb-2" />
                <CardTitle className="text-pink-800">Comprehensive Care</CardTitle>
                <CardDescription>
                  All-in-one platform for patients, doctors, and healthcare administrators
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients and doctors using HealthSync for better health management
          </p>
          <Button 
            size="lg" 
            onClick={() => { setAuthMode('register'); setShowAuth(true); }}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-2xl font-bold">HealthSync</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering healthcare through technology
          </p>
          <p className="text-sm text-gray-500">
            © 2024 HealthSync. All rights reserved. HIPAA Compliant & Secure.
          </p>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;

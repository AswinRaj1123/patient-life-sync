
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Calendar, User, Image, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ChestXRayViewProps {
  onBack: () => void;
}

const ChestXRayView = ({ onBack }: ChestXRayViewProps) => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
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
                <Image className="w-5 h-5 text-blue-600" />
                <CardTitle>Chest X-Ray</CardTitle>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-green-600"
              onClick={() => toast({ title: "Downloading X-Ray images..." })}
            >
              <Download className="w-4 h-4 mr-2" />
              Download DICOM
            </Button>
          </div>
          <CardDescription>
            Posterior-Anterior (PA) and Lateral chest radiograph - January 8, 2024
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Imaging Information */}
          <div className="grid md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Study Date</p>
                <p className="text-sm text-gray-600">January 8, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Radiologist</p>
                <p className="text-sm text-gray-600">Dr. Michael Chen</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Image className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Study ID</p>
                <p className="text-sm text-gray-600">CXR-2024-002</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                Final Report
              </Badge>
            </div>
          </div>

          {/* X-Ray Viewer */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* PA View */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">PA View</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleZoomOut}>
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600">{zoomLevel}%</span>
                    <Button variant="outline" size="sm" onClick={handleZoomIn}>
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-white"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    <div className="text-center">
                      <div className="w-64 h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-lg">📸 Chest X-Ray PA View</span>
                      </div>
                      <p className="text-sm text-gray-300">High resolution DICOM image</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lateral View */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lateral View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-white"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    <div className="text-center">
                      <div className="w-64 h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-lg">📸 Chest X-Ray Lateral View</span>
                      </div>
                      <p className="text-sm text-gray-300">High resolution DICOM image</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Radiology Report */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span className="text-green-600">📋</span>
                <span>Radiology Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Clinical History</h4>
                <p className="text-sm text-gray-700">
                  Routine pre-operative screening. No acute symptoms reported.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Technique</h4>
                <p className="text-sm text-gray-700">
                  Upright PA and lateral chest radiographs were obtained.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Findings</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Lungs:</strong> Clear bilaterally. No focal consolidation, masses, or pleural effusions.</li>
                  <li>• <strong>Heart:</strong> Normal size and contour. Cardiothoracic ratio within normal limits.</li>
                  <li>• <strong>Mediastinum:</strong> Normal width and contour. No lymphadenopathy.</li>
                  <li>• <strong>Bones:</strong> No acute osseous abnormalities identified.</li>
                  <li>• <strong>Soft tissues:</strong> Unremarkable.</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Impression</h4>
                <p className="text-sm text-green-700">
                  <strong>Normal chest radiograph.</strong> No acute cardiopulmonary abnormalities.
                </p>
              </div>

              <div className="text-xs text-gray-500 pt-4 border-t">
                <p>Electronically signed by Dr. Michael Chen, MD on January 8, 2024 at 3:45 PM</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChestXRayView;

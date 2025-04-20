"use client"

import { useState } from "react"
import {
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Moon,
  RotateCw,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Layout } from "@/components/layout"
import { WebcamFeed } from "@/components/webcam-feed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

// ESP32 IP address
const ESP32_IP = "192.168.0.109"; // Replace with your ESP32's IP address

// Initial sample data for snapshots
const initialSnapshots = [
  { id: 1, url: "https://placehold.co/300x200", timestamp: "2025-04-03 14:30:22", reason: "Manual" },
  { id: 2, url: "https://placehold.co/300x200", timestamp: "2025-04-03 12:15:05", reason: "Motion Detected" },
]

// Sample data for camera activities
const cameraActivities = [
  { id: 1, time: "2025-04-03 14:30:22", type: "Snapshot Taken", details: "Manual snapshot at 2:30 PM" },
  { id: 2, time: "2025-04-03 12:15:05", type: "Motion Detected", details: "Pet activity detected near feeder" },
  { id: 3, time: "2025-04-03 09:45:18", type: "Snapshot Taken", details: "Manual snapshot at 9:45 AM" },
  { id: 4, time: "2025-04-02 19:20:33", type: "Motion Detected", details: "Pet activity detected near feeder" },
]

export default function CameraPage({ navigateTo }: { navigateTo: (path: string) => void }) {
  const [cameraOn, setCameraOn] = useState(true)
  const [nightVision, setNightVision] = useState(false)
  const [motionDetection, setMotionDetection] = useState(true)
  const [notifyOnMotion, setNotifyOnMotion] = useState(true)
  const [resolution, setResolution] = useState("720p")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [snapshots, setSnapshots] = useState(initialSnapshots)
  const [panAngle, setPanAngle] = useState(90) // Start at center
  const [tiltAngle, setTiltAngle] = useState(90) // Start at center

  const handleCapture = (imageSrc: string) => {
    const newSnapshot = {
      id: Date.now(),
      url: imageSrc,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      reason: "Manual",
    }
    setSnapshots([newSnapshot, ...snapshots])
    alert("Snapshot taken and saved to gallery!")
  }

  const handleViewImage = (image: any) => {
    setSelectedImage(image)
  }

  const handleFeedNow = () => {
    alert("Feeding now!")
  }

  const handleDeleteImage = () => {
    if (selectedImage) {
      setSnapshots(snapshots.filter((snap) => snap.id !== selectedImage.id))
      setSelectedImage(null)
    }
  }

  const sendServoCommand = async (endpoint: string, angle: number) => {
    try {
      const response = await fetch(`http://${ESP32_IP}/${endpoint}?angle=${angle}`);
      if (!response.ok) {
        throw new Error("Failed to send command");
      }
      const text = await response.text();
      console.log(text);
    } catch (error) {
      console.error("Error sending servo command:", error);
      alert("Failed to control camera. Ensure the ESP32 is connected and on the same network.");
    }
  }

  const handlePanLeft = () => {
    const newAngle = Math.max(0, panAngle - 5);
    setPanAngle(newAngle);
    sendServoCommand("pan", newAngle);
  }

  const handlePanRight = () => {
    const newAngle = Math.min(180, panAngle + 5);
    setPanAngle(newAngle);
    sendServoCommand("pan", newAngle);
  }

  const handleTiltUp = () => {
    const newAngle = Math.min(180, tiltAngle + 5);
    setTiltAngle(newAngle);
    sendServoCommand("tilt", newAngle);
  }

  const handleTiltDown = () => {
    const newAngle = Math.max(0, tiltAngle - 5);
    setTiltAngle(newAngle);
    sendServoCommand("tilt", newAngle);
  }

  return (
    <Layout
      currentPath="/camera"
      navigateTo={navigateTo}
      title="Live Camera Feed"
      showFeedNowButton={true}
      onFeedNow={handleFeedNow}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Live Feed and Controls */}
        <div className="md:col-span-2 space-y-6">
          {/* Live Feed Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Live Feed</CardTitle>
              <CardDescription>Monitor your pet in real-time from anywhere</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {cameraOn ? (
                <WebcamFeed onCapture={handleCapture} />
              ) : (
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center rounded-md overflow-hidden">
                  <div className="text-white text-center p-6">
                    <svg
                      className="h-12 w-12 mx-auto mb-2 opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 10L19.5528 7.72361C19.8343 7.58281 20 7.30339 20 7V17C20 17.3034 19.8343 17.5828 19.5528 17.7236L15 15M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>Camera is currently turned off</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="camera-toggle" className="cursor-pointer">
                  Camera Power
                </Label>
                <Switch id="camera-toggle" checked={cameraOn} onCheckedChange={setCameraOn} />
              </div>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="360p">360p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>

          {/* Camera Controls Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Camera Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Zoom Controls */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Zoom</h3>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.1))}
                      disabled={zoomLevel <= 1}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[zoomLevel * 10]}
                      min={10}
                      max={30}
                      step={1}
                      className="flex-1"
                      onValueChange={(value) => setZoomLevel(value[0] / 10)}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
                      disabled={zoomLevel >= 3}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center text-sm text-gray-500">{zoomLevel.toFixed(1)}x</div>
                </div>

                {/* Pan & Tilt Controls */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Pan & Tilt</h3>
                  <div className="grid grid-cols-3 gap-2 justify-items-center">
                    <div></div>
                    <Button variant="outline" size="icon" onClick={handleTiltUp}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <div></div>

                    <Button variant="outline" size="icon" onClick={handlePanLeft}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="w-9 h-9 rounded-full bg-gray-100"></div>
                    <Button variant="outline" size="icon" onClick={handlePanRight}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div></div>
                    <Button variant="outline" size="icon" onClick={handleTiltDown}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Rotate Camera */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Rotate Camera</h3>
                    <p className="text-xs text-gray-500">Switch camera view</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <RotateCw className="h-4 w-4 mr-2" />
                    Rotate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Snapshot Gallery */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Captured Moments</CardTitle>
              <CardDescription>Recent snapshots from your camera</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {snapshots.slice(0, 6).map((snapshot) => (
                  <div
                    key={snapshot.id}
                    className="relative cursor-pointer rounded-md overflow-hidden shadow-sm border border-gray-100"
                    onClick={() => handleViewImage(snapshot)}
                  >
                    <img
                      src={snapshot.url || "/placeholder.svg"}
                      alt={`Snapshot ${snapshot.id}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                      {new Date(snapshot.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Snapshots
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Settings and Activity */}
        <div className="space-y-6">
          {/* Activity Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Recent Camera Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cameraActivities.map((activity) => (
                  <div key={activity.id} className="border-l-2 border-orange-200 pl-4 pb-4 relative">
                    <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-0"></div>
                    <p className="text-xs text-gray-500">{new Date(activity.time).toLocaleString()}</p>
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Activities
              </Button>
            </CardFooter>
          </Card>

          {/* Troubleshooting Tips */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Troubleshooting Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
                  <p className="text-sm">Camera not connecting? Try refreshing the page or checking your network.</p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
                  <p className="text-sm">
                    Poor video quality? Adjust resolution in settings or check your internet speed.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-orange-500">
                Visit our help center for more support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Image View Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
            <DialogDescription>Captured on {selectedImage?.timestamp}</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={`Snapshot ${selectedImage.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-orange-100 text-orange-500 hover:bg-orange-200 border-orange-200">
                  {selectedImage.reason}
                </Badge>
                <div className="text-sm text-gray-500">{new Date(selectedImage.timestamp).toLocaleString()}</div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="destructive" size="sm" className="gap-2" onClick={handleDeleteImage}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
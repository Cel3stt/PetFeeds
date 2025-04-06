"use client"

import { useRef, useState, useCallback } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { CameraIcon, Video, Maximize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WebcamFeedProps {
  onCapture: (imageSrc: string) => void
}

export function WebcamFeed({ onCapture }: WebcamFeedProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isRecording, setIsRecording] = useState(false)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      onCapture(imageSrc)
    }
  }, [onCapture])

  const handleToggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      alert("Recording started!")
    } else {
      alert("Recording stopped and saved!")
    }
  }

  return (
    <div className="relative aspect-video bg-gray-900 flex items-center justify-center rounded-md overflow-hidden">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user",
        }}
      />

      {/* Camera controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-sm">
            <Badge variant="outline" className="bg-green-700 text-white border-green-600">
              Live
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={capture}>
              <CameraIcon className="h-5 w-5" />
            </Button>
            {/* <Button
              variant="ghost"
              size="icon"
              className={`text-white hover:bg-white/20 ${isRecording ? "text-red-500" : ""}`}
              onClick={handleToggleRecording}
            >
              <Video className="h-5 w-5" />
            </Button> */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


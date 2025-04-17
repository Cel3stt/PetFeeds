"use client"

import { useState } from "react"
import Dashboard from "@/pages/dashboard"
import Schedule from "@/pages/schedule"
import CameraPage from "@/pages/camera"
import NotificationsPage from "./Pages/Notifications"
import SettingsPage from "./Pages/Settings"
import { Toaster } from "react-hot-toast";
import HistoryPage from "./Pages/History"

export default function App() {
  const [currentPage, setCurrentPage] = useState("/")

  const navigateTo = (path: string) => {
    setCurrentPage(path)
  }

  return (
    <>
    <Toaster position="top-right"/>
      {currentPage === "/" && <Dashboard navigateTo={navigateTo} />}
      {currentPage === "/schedule" && <Schedule navigateTo={navigateTo} />}
      {currentPage === "/camera" && <CameraPage navigateTo={navigateTo} />}
      {currentPage === "/history" && <HistoryPage navigateTo={navigateTo} />}
      {currentPage === "/notifications" && <NotificationsPage navigateTo={navigateTo} />}
      {currentPage === "/settings" && <SettingsPage navigateTo={navigateTo} />}


    </>
  )
}


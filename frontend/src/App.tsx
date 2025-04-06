"use client"

import { useState } from "react"
import Dashboard from "./Pages/Dashboard"
import Schedule from "./Pages/Schedule"
import CameraPage from "./Pages/Camera"
import NotificationsPage from "./Pages/Notifications"
import SettingsPage from "./Pages/Settings"
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Login/Signup"

export default function App() {
  const [currentPage, setCurrentPage] = useState("/"); 

  const navigateTo = (path: string) => {
    setCurrentPage(path)
  }



  return (
    <>    
    <Toaster position="top-right"/>
      {currentPage === "/" && <Dashboard navigateTo={navigateTo} />}
      {currentPage === "/schedule" && <Schedule navigateTo={navigateTo} />}
      {currentPage === "/camera" && <CameraPage navigateTo={navigateTo} />}
      {currentPage === "/notifications" && <NotificationsPage navigateTo={navigateTo} />}
      {currentPage === "/settings" && <SettingsPage navigateTo={navigateTo} />}
      {currentPage === "/login" && <Login navigateTo={navigateTo} />}
      {currentPage === "/signup" && <Signup navigateTo={navigateTo} />}


    </>
  )
}


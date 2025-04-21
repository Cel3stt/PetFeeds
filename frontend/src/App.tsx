"use client"

import { useState } from "react"
import Dashboard from "@/Pages/Dashboard"
import Schedule from "@/Pages/Schedule"
import CameraPage from "@/Pages/Camera"
import { Toaster } from "react-hot-toast";
import HistoryPage from "@/Pages/History"

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
    </>
  )
}


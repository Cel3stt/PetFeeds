"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: number
  message: string
  timestamp: string
  read: boolean
  type: "info" | "warning" | "critical"
}

// Sample notification data
const sampleNotifications: Notification[] = [
  {
    id: 1,
    message: "Food level is below 20%. Consider refilling soon.",
    timestamp: "2025-04-03T14:30:22",
    read: false,
    type: "warning",
  },
  {
    id: 2,
    message: "Scheduled feeding completed successfully.",
    timestamp: "2025-04-03T12:15:05",
    read: true,
    type: "info",
  },
  {
    id: 3,
    message: "Camera disconnected unexpectedly.",
    timestamp: "2025-04-03T09:45:18",
    read: false,
    type: "critical",
  },
  {
    id: 4,
    message: "Motion detected near the feeder.",
    timestamp: "2025-04-02T19:20:33",
    read: true,
    type: "info",
  },
]

interface HeaderProps {
  title: string
  showFeedNowButton?: boolean
  onFeedNow?: () => void
  navigateTo: (path: string) => void
}

export function Header({ title, showFeedNowButton = false, onFeedNow, navigateTo }: HeaderProps) {
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false)

  // Fix for portal rendering issues
  useEffect(() => {
    // Force a reflow to ensure portals render correctly
    if (isNotificationDropdownOpen || isAvatarDropdownOpen) {
      document.body.style.pointerEvents = "auto"
      return () => {
        document.body.style.pointerEvents = ""
      }
    }
  }, [isNotificationDropdownOpen, isAvatarDropdownOpen])

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleViewAllNotifications = () => {
    navigateTo("/notifications")
    setIsNotificationDropdownOpen(false)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between border-b border-gray-100 relative z-50">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        {showFeedNowButton && (
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={onFeedNow}>
            Feed now
          </Button>
        )}

        {/* Notification Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={(e) => {
              e.preventDefault()
              setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
              setIsAvatarDropdownOpen(false)
            }}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white">
                {unreadCount}
              </Badge>
            )}
            <span className="sr-only">Open notifications</span>
          </Button>

          {isNotificationDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
              <div className="flex items-center justify-between p-4">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMarkAllAsRead()
                    }}
                    className="text-xs h-8"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="border-t border-gray-100"></div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className={`w-full p-3 ${notification.read ? "" : "bg-orange-50"}`}>
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <p className={`text-sm ${notification.read ? "text-gray-600" : "font-medium text-gray-900"}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                           
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(notification.id)
                            }}
                            disabled={notification.read}
                            className="h-6 w-6"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(notification.id)
                            }}
                            className="h-6 w-6 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-gray-100"></div>
              <Button
                variant="ghost"
                className="w-full justify-center py-2 h-10"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewAllNotifications()
                }}
              >
                View all notifications
              </Button>
            </div>
          )}
        </div>

        {/* Avatar Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full p-0"
            onClick={(e) => {
              e.preventDefault()
              setIsAvatarDropdownOpen(!isAvatarDropdownOpen)
              setIsNotificationDropdownOpen(false)
            }}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="sr-only">Open user menu</span>
          </Button>

          {isAvatarDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
              <div className="px-4 py-3">
                <p className="text-sm font-medium">My Account</p>
              </div>
              <div className="border-t border-gray-100"></div>
              <div className="py-1">
                
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    navigateTo("/settings")
                    setIsAvatarDropdownOpen(false)
                  }}
                >
                  Settings
                </button>
              </div>
              <div className="border-t border-gray-100"></div>
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Log out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

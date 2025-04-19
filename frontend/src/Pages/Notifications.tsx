"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { AlertCircle, Bell, Check, Info, Mail, MessageSquare, Phone, Search, Trash2 } from "lucide-react"

// Sample notification data
const notificationsData = [
  {
    id: 1,
    message: "Food level is below 20%. Consider refilling soon.",
    timestamp: "2025-04-03T14:30:22",
    read: false,
  },
  {
    id: 2,
    message: "Scheduled feeding completed successfully.",
    timestamp: "2025-04-03T12:15:05",
    read: true,
  },
  {
    id: 3,
    message: "Camera disconnected unexpectedly.",
    timestamp: "2025-04-03T09:45:18",
    read: false,
  },

  {
    id: 9,
    message: "Your pet has been fed 3 times today.",
    timestamp: "2025-03-31T20:15:00",
    read: true,
  },

  {
    id: 12,
    message: "Feeder has been inactive for 24 hours.",
    timestamp: "2025-03-29T18:30:00",
    read: false,
  },
]

// Critical alerts
const criticalAlerts = [
  {
    id: 1,
    title: "Low Food Level",
    message: "Food is below 20% capacity.",
    action: "Check Feeder",
    icon: AlertCircle,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    id: 2,
    title: "Camera Disconnected",
    message: "Live feed unavailable.",
    action: "Reconnect",
    icon: AlertCircle,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
]

export default function NotificationsPage({ navigateTo }: { navigateTo: (path: string) => void }) {
  const [notifications, setNotifications] = useState(notificationsData)
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("all")


  // Filter notifications based on current filters
  const filteredNotifications = notifications.filter((notification) => {
  

    // Filter by search query
    if (searchQuery && !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by date range
    if (dateRange !== "all") {
      const notificationDate = new Date(notification.timestamp)
      const today = new Date()

      if (dateRange === "today") {
        return notificationDate.toDateString() === today.toDateString()
      } else if (dateRange === "week") {
        const weekAgo = new Date()
        weekAgo.setDate(today.getDate() - 7)
        return notificationDate >= weekAgo
      } else if (dateRange === "month") {
        const monthAgo = new Date()
        monthAgo.setMonth(today.getMonth() - 1)
        return notificationDate >= monthAgo
      }
    }

    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const todayCount = notifications.filter((n) => {
    const notificationDate = new Date(n.timestamp)
    const today = new Date()
    return notificationDate.toDateString() === today.toDateString()
  }).length

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleClearAllNotifications = () => {
    if (confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([])
    }
  }

 

  return (
    <Layout currentPath="/notifications" navigateTo={navigateTo} title="Notifications">
      <div className="mb-4">
        <p className="text-gray-600">Stay updated with your pet feeder's activities and alerts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-1">
          {/* Notification Summary Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Notification Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Notifications Today</span>
                <Badge className="bg-blue-100 text-blue-600 border-blue-200">{todayCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Unread Notifications</span>
                <Badge className="bg-orange-100 text-orange-500 border-orange-200">{unreadCount}</Badge>
              </div>
              <div className="space-y-2">
                <span className="text-sm text-gray-600">Most Recent Alert</span>
                {notifications.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium">{notifications[0].message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notifications[0].timestamp).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleClearAllNotifications}
                disabled={notifications.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </CardFooter>
          </Card>

        

        </div>

        {/* Right Column */}
        <div className="space-y-6 md:col-span-2">
          {/* Recent Notifications List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Recent Notifications</CardTitle>
              <CardDescription>Filter and search your notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search notifications..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No notifications found</div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${notification.read ? "bg-white" : "bg-orange-50"}`}
                    >
                      <div className="flex items-start gap-3">
                        
                        <div className="flex-1">
                          <p className={`text-sm ${notification.read ? "text-gray-600" : "font-medium text-gray-900"}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                           
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleMarkAsRead(notification.id)}
                            disabled={notification.read}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            
          </Card>

          {/* Critical Alerts Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Critical Alerts</CardTitle>
              <CardDescription>Issues that require your immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg ${alert.bgColor} border border-${alert.color}/20`}>
                    <div className="flex items-start gap-3">
                      <alert.icon className={`h-5 w-5 ${alert.color} shrink-0`} />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

         
        </div>
      </div>
    </Layout>
  )
}


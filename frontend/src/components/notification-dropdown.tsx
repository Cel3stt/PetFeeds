"use client"
import { Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: number
  message: string
  timestamp: string
  read: boolean
  type: "info" | "warning" | "critical"
}

interface NotificationDropdownProps {
  notifications: Notification[]
  onMarkAsRead: (id: number) => void
  onMarkAllAsRead: () => void
  onViewAllNotifications: () => void
}

export function NotificationDropdown({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAllNotifications,
}: NotificationDropdownProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs h-8">
              <Check className="h-3 w-3 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                <div
                  className={`w-full p-3 cursor-default ${notification.read ? "" : "bg-orange-50"}`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? "text-gray-600" : "font-medium text-gray-900"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                    <Badge
                      className={
                        notification.type === "critical"
                          ? "bg-red-100 text-red-600 border-red-200"
                          : notification.type === "warning"
                            ? "bg-yellow-100 text-yellow-600 border-yellow-200"
                            : "bg-blue-100 text-blue-600 border-blue-200"
                      }
                    >
                      {notification.type === "critical"
                        ? "Critical"
                        : notification.type === "warning"
                          ? "Warning"
                          : "Info"}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 focus:bg-transparent">
          <Button variant="ghost" className="w-full justify-center py-2 h-10" onClick={onViewAllNotifications}>
            View all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


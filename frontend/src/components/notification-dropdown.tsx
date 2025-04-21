"use client"
import { Bell, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // Import custom component
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: number
  message: string
  timestamp: string
  read: boolean
  type: "info" | "warning" | "critical"
  channel: string
}

interface NotificationDropdownProps {
  notifications: Notification[]
  onMarkAsRead: (id: number) => void
  onDelete?: (id: number) => void
  onMarkAllAsRead: () => void
  onViewAllNotifications: () => void
}

export function NotificationDropdown({
  notifications,
  onMarkAsRead,
  onDelete,
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
          <span className="sr-only">Open notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80"
        forceMount
        sideOffset={8}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onMarkAllAsRead()
              }}
              className="text-xs h-8"
            >
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
              <DropdownMenuItem
                key={notification.id}
                className="p-0 focus:bg-transparent cursor-default"
                onSelect={(e) => e.preventDefault()}
              >
                <div className={`w-full p-3 ${notification.read ? "" : "bg-orange-50"}`}>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? "text-gray-600" : "font-medium text-gray-900"}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
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
                        <Badge className="bg-gray-100 text-gray-600 border-gray-200">{notification.channel}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          onMarkAsRead(notification.id)
                        }}
                        disabled={notification.read}
                        className="h-6 w-6"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(notification.id)
                          }}
                          className="h-6 w-6 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="p-0 focus:bg-transparent"
          onSelect={(e) => {
            e.preventDefault()
            onViewAllNotifications()
          }}
        >
          <Button variant="ghost" className="w-full justify-center py-2 h-10" onClick={(e) => e.stopPropagation()}>
            View all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
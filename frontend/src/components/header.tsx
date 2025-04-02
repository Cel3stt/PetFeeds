"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationDropdown } from "./notification-dropdown"

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    message: "Food level is below 20%. Consider refilling soon.",
    timestamp: "2025-04-03T14:30:22",
    read: false,
    type: "warning" as const,
  },
  {
    id: 2,
    message: "Scheduled feeding completed successfully.",
    timestamp: "2025-04-03T12:15:05",
    read: true,
    type: "info" as const,
  },
  {
    id: 3,
    message: "Camera disconnected unexpectedly.",
    timestamp: "2025-04-03T09:45:18",
    read: false,
    type: "critical" as const,
  },
  {
    id: 4,
    message: "Motion detected near the feeder.",
    timestamp: "2025-04-02T19:20:33",
    read: true,
    type: "info" as const,
  },
]

interface HeaderProps {
  title: string
  showFeedNowButton?: boolean
  onFeedNow?: () => void
  navigateTo: (path: string) => void
}

export function Header({ title, showFeedNowButton = false, onFeedNow, navigateTo }: HeaderProps) {
  const handleMarkAsRead = (id: number) => {
    // In a real app, this would update the notification state
    console.log(`Marking notification ${id} as read`)
  }

  const handleMarkAllAsRead = () => {
    // In a real app, this would update all notifications
    console.log("Marking all notifications as read")
  }

  const handleViewAllNotifications = () => {
    navigateTo("/notifications")
  }

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between border-b border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        {showFeedNowButton && (
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={onFeedNow}>
            Feed now
          </Button>
        )}
        <NotificationDropdown
          notifications={sampleNotifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onViewAllNotifications={handleViewAllNotifications}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}


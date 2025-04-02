"use client"

import { useState } from "react"
import { Info, Plus, Trash2, Settings } from "lucide-react"
import { Layout } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for scheduled feedings
const scheduleData = [
  { id: 1, time: "06:00 AM", portion: "100g", frequency: "Daily", status: "Active" },
  { id: 2, time: "12:30 PM", portion: "120g", frequency: "Daily", status: "Active" },
  { id: 3, time: "06:00 PM", portion: "100g", frequency: "Daily", status: "Active" },
  { id: 4, time: "10:00 PM", portion: "50g", frequency: "Mon, Wed, Fri", status: "Paused" },
  { id: 5, time: "02:00 PM", portion: "75g", frequency: "Weekends", status: "Active" },
]

// Sample data for recent automated feeds
const recentFeeds = [
  { id: 1, date: "2025-04-03", time: "06:00 AM", portion: "100g", status: "Successful" },
  { id: 2, date: "2025-04-02", time: "06:00 PM", portion: "100g", status: "Successful" },
  { id: 3, date: "2025-04-02", time: "12:30 PM", portion: "120g", status: "Successful" },
  { id: 4, date: "2025-04-02", time: "06:00 AM", portion: "100g", status: "Failed" },
  { id: 5, date: "2025-04-01", time: "06:00 PM", portion: "100g", status: "Successful" },
]

// Days of the week for checkboxes
const daysOfWeek = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
]

export default function Schedule({ navigateTo }: { navigateTo: (path: string) => void }) {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentSchedule, setCurrentSchedule] = useState<any>(null)
  const [automatedFeeding, setAutomatedFeeding] = useState(true)
  const [manualReminders, setManualReminders] = useState(false)
  const [notificationMethod, setNotificationMethod] = useState("app")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("time")

  // Filter schedules based on status
  const filteredSchedules = scheduleData.filter((schedule) => {
    if (filterStatus === "all") return true
    return schedule.status.toLowerCase() === filterStatus.toLowerCase()
  })

  // Sort schedules based on selected sort option
  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    if (sortBy === "time") {
      return a.time.localeCompare(b.time)
    } else if (sortBy === "frequency") {
      return a.frequency.localeCompare(b.frequency)
    }
    return 0
  })

  // Handle edit schedule
  const handleEditSchedule = (schedule: any) => {
    setCurrentSchedule(schedule)
    setEditDialogOpen(true)
  }

  const handleFeedNow = () => {
    alert("Feeding now!")
  }

  return (
    <Layout
      currentPath="/schedule"
      navigateTo={navigateTo}
      title="Feed Schedule"
      showFeedNowButton={true}
      onFeedNow={handleFeedNow}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Panel - Schedule Overview */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Current Feeding Schedule</CardTitle>
                <CardDescription>Manage your pet's feeding times</CardDescription>
              </div>
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Feeding Schedule</DialogTitle>
                    <DialogDescription>Create a new scheduled feeding time for your pet.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="portion">Portion Size (grams)</Label>
                      <Input id="portion" type="number" min="1" placeholder="100" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="custom">Every X Hours</SelectItem>
                          <SelectItem value="specific">Specific Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Days of Week</Label>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                          <div key={day.id} className="flex items-center space-x-2">
                            <Checkbox id={day.id} />
                            <Label htmlFor={day.id} className="text-sm font-normal">
                              {day.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input id="notes" placeholder="Add any additional information" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setAddDialogOpen(false)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Label>Sort by:</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time">Time</SelectItem>
                      <SelectItem value="frequency">Frequency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label>Filter:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Portion Size</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.time}</TableCell>
                      <TableCell>{schedule.portion}</TableCell>
                      <TableCell>{schedule.frequency}</TableCell>
                      <TableCell>
                        <Badge
                          variant={schedule.status === "Active" ? "outline" : "secondary"}
                          className={
                            schedule.status === "Active"
                              ? "bg-green-100 text-green-600 hover:bg-green-200 border-green-200"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {schedule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditSchedule(schedule)}>
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Automated Feeds */}
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Automated Feeds</CardTitle>
              <CardDescription>History of recent automated feeding events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Portion</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentFeeds.map((feed) => (
                    <TableRow key={feed.id}>
                      <TableCell>{feed.date}</TableCell>
                      <TableCell>{feed.time}</TableCell>
                      <TableCell>{feed.portion}</TableCell>
                      <TableCell>
                        <Badge
                          variant={feed.status === "Successful" ? "outline" : "destructive"}
                          className={
                            feed.status === "Successful"
                              ? "bg-green-100 text-green-600 hover:bg-green-200 border-green-200"
                              : "bg-red-100 text-red-600 hover:bg-red-200 border-red-200"
                          }
                        >
                          {feed.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All History
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Panel - Settings and Tips */}
        <div className="space-y-6">
          {/* Automated Feeding Settings */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Automated Feeding</CardTitle>
              <CardDescription>Control automatic feeding settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Automated Feeding</Label>
                  <p className="text-sm text-gray-500">Automatically dispense food based on the set schedule</p>
                </div>
                <Switch checked={automatedFeeding} onCheckedChange={setAutomatedFeeding} />
              </div>
            </CardContent>
          </Card>

          {/* Manual Feeding Reminder */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Manual Feeding Reminders</CardTitle>
              <CardDescription>Get notified when it's time to feed your pet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Reminders</Label>
                  <p className="text-sm text-gray-500">Receive reminders if no feeding has occurred</p>
                </div>
                <Switch checked={manualReminders} onCheckedChange={setManualReminders} />
              </div>

              <div className="space-y-2">
                <Label>Reminder Frequency</Label>
                <Select defaultValue="4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Every 2 hours</SelectItem>
                    <SelectItem value="4">Every 4 hours</SelectItem>
                    <SelectItem value="6">Every 6 hours</SelectItem>
                    <SelectItem value="8">Every 8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notification Method</Label>
                <RadioGroup defaultValue="app" value={notificationMethod} onValueChange={setNotificationMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="sms" />
                    <Label htmlFor="sms">SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="app" />
                    <Label htmlFor="app">In-App Notification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Save Preferences</Button>
            </CardContent>
          </Card>

          {/* Schedule Optimization Tips */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Schedule Optimization Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-orange-500 shrink-0" />
                <p className="text-sm">Feeding your pet at consistent times helps maintain their health.</p>
              </div>
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-orange-500 shrink-0" />
                <p className="text-sm">Adjust portion sizes based on your pet's age and activity level.</p>
              </div>
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-orange-500 shrink-0" />
                <p className="text-sm">
                  For cats, multiple small meals throughout the day may be better than fewer large meals.
                </p>
              </div>
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-orange-500 shrink-0" />
                <p className="text-sm">Consider your pet's natural eating patterns when setting up the schedule.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Schedule Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Feeding Schedule</DialogTitle>
            <DialogDescription>Modify the existing feeding schedule.</DialogDescription>
          </DialogHeader>
          {currentSchedule && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input id="edit-time" type="time" defaultValue={currentSchedule.time} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-portion">Portion Size (grams)</Label>
                <Input
                  id="edit-portion"
                  type="number"
                  min="1"
                  defaultValue={currentSchedule.portion.replace("g", "")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-frequency">Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder={currentSchedule.frequency} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="custom">Every X Hours</SelectItem>
                    <SelectItem value="specific">Specific Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Days of Week</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <div key={`edit-${day.id}`} className="flex items-center space-x-2">
                      <Checkbox id={`edit-${day.id}`} defaultChecked={currentSchedule.frequency.includes(day.label)} />
                      <Label htmlFor={`edit-${day.id}`} className="text-sm font-normal">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes (Optional)</Label>
                <Input id="edit-notes" placeholder="Add any additional information" />
              </div>
              <div className="flex items-center space-x-2">
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked={currentSchedule.status === "Active"} />
                  <Label className="text-sm font-normal">
                    {currentSchedule.status === "Active" ? "Active" : "Paused"}
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditDialogOpen(false)} className="bg-orange-500 hover:bg-orange-600 text-white">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}


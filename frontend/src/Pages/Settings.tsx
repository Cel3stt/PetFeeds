"use client"

import { Calendar } from "@/components/ui/calendar"

import type React from "react"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  Battery,
  BellRing,
  Camera,
  Check,
  CreditCard,
  Database,
  Download,
  HardDrive,
  LogOut,
  RotateCw,
  Save,
  SettingsIcon,
  Smartphone,
  Trash2,
  User,
  Utensils,
  Wifi,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage({ navigateTo }: { navigateTo: (path: string) => void }) {
  // Account settings state
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [profilePicture, setProfilePicture] = useState("https://github.com/shadcn.png")

  // Device settings state
  const [deviceName, setDeviceName] = useState("PetFeeder-2000")
  const [deviceId, setDeviceId] = useState("PF-2023-12345")
  const [wifiStatus, setWifiStatus] = useState("Connected")
  const [wifiNetwork, setWifiNetwork] = useState("Home-Network-5G")
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [storageUsage, setStorageUsage] = useState(42)
  const [firmwareVersion, setFirmwareVersion] = useState("v2.3.1")
  const [firmwareUpdateAvailable, setFirmwareUpdateAvailable] = useState(true)

  // Feeding settings state
  const [defaultPortionSize, setDefaultPortionSize] = useState("100")
  const [manualFeedPortion, setManualFeedPortion] = useState("50")
  const [feedingFrequency, setFeedingFrequency] = useState("daily")
  const [pauseAutomatedFeeding, setPauseAutomatedFeeding] = useState(false)

  // UI state
  const [activeTab, setActiveTab] = useState("account")
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [wifiSettingsOpen, setWifiSettingsOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Handle form changes
  const handleInputChange = () => {
    setHasUnsavedChanges(true)
  }

  // Handle save all changes
  const handleSaveAllChanges = () => {
    alert("All changes saved successfully!")
    setHasUnsavedChanges(false)
  }

  // Handle discard changes
  const handleDiscardChanges = () => {
    // Reset all form values to their original state
    // This would typically reload the data from the server
    alert("All changes discarded!")
    setHasUnsavedChanges(false)
  }

  // Handle password change
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!")
      return
    }

    if (!currentPassword) {
      alert("Please enter your current password!")
      return
    }

    alert("Password changed successfully!")
    setChangePasswordOpen(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  // Handle firmware update
  const handleFirmwareUpdate = () => {
    alert("Firmware update started. This may take a few minutes.")
    // In a real app, this would trigger the update process
  }

  // Handle factory reset
  const handleFactoryReset = () => {
    alert("Device has been reset to factory settings.")
    // In a real app, this would trigger the reset process
  }

  // Handle device restart
  const handleDeviceRestart = () => {
    alert("Device restart initiated.")
    // In a real app, this would trigger the restart process
  }

  // Handle profile picture upload
  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload the file to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file)
      setProfilePicture(url)
      setHasUnsavedChanges(true)
    }
  }

  return (
    <Layout currentPath="/settings" navigateTo={navigateTo} title="Settings">
      <div className="mb-4">
        <p className="text-gray-600">Manage your preferences and device configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="md:w-64 shrink-0">
          <Card>
            <CardContent className="p-0">
              <Tabs
                defaultValue="account"
                orientation="vertical"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto w-full rounded-none items-stretch shadow-none">
                  <TabsTrigger
                    value="account"
                    className="justify-start px-4 py-3  data-[state=active]:bg-orange-50 data-[state=active]:text-orange-500"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="device"
                    className="justify-start px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-500"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Device
                  </TabsTrigger>
                  <TabsTrigger
                    value="feeding"
                    className="justify-start px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-500"
                  >
                    <Utensils className="h-4 w-4 mr-2" />
                    Feeding
                  </TabsTrigger>
                  <TabsTrigger
                    value="data"
                    className="justify-start px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-500"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Data & Storage
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-500"
                  >
                    <BellRing className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="justify-start px-4 py-3 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-500"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-4 border-t">
              
              <Button variant="outline" className="w-full justify-start text-red-500" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="space-y-6">
            {/* Account Settings */}
            {activeTab === "account" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex flex-col items-center gap-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profilePicture} alt={name} />
                          <AvatarFallback>
                            {name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="relative">
                          <input
                            type="file"
                            id="profile-picture"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                          />
                          <Label
                            htmlFor="profile-picture"
                            className="cursor-pointer text-sm text-orange-500 hover:text-orange-600"
                          >
                            Change Photo
                          </Label>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value)
                              handleInputChange()
                            }}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              handleInputChange()
                            }}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value)
                              handleInputChange()
                            }}
                          />
                          <p className="text-xs text-gray-500">Used for SMS notifications and account recovery</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your password and account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Password</h3>
                        <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                      </div>
                      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Change Password</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Enter your current password and a new password to update your credentials.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setChangePasswordOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={handlePasswordChange}
                            >
                              Update Password
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Connected Accounts</h3>
                        <p className="text-sm text-gray-500">Link your accounts for easier login</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>Manage your account data and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Download Your Data</h3>
                        <p className="text-sm text-gray-500">Get a copy of all your account data</p>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-red-500">Delete Account</h3>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove all
                              your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Device Settings */}
            {activeTab === "device" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Device Information</CardTitle>
                    <CardDescription>View and manage your connected pet feeder</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Device Name</h3>
                        <p className="text-base">{deviceName}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Rename
                      </Button>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium">Device ID</h3>
                      <p className="text-base">{deviceId}</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Firmware Version</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-base">{firmwareVersion}</p>
                          {firmwareUpdateAvailable && (
                            <Badge className="bg-green-100 text-green-600 border-green-200">Update Available</Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!firmwareUpdateAvailable}
                        onClick={handleFirmwareUpdate}
                      >
                        Update Firmware
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wi-Fi Settings</CardTitle>
                    <CardDescription>Manage your device's network connection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Wi-Fi Status</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={
                              wifiStatus === "Connected"
                                ? "bg-green-100 text-green-600 border-green-200"
                                : "bg-red-100 text-red-600 border-red-200"
                            }
                          >
                            {wifiStatus}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setWifiStatus(wifiStatus === "Connected" ? "Disconnected" : "Connected")}
                      >
                        {wifiStatus === "Connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Current Network</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Wifi className="h-4 w-4 text-gray-500" />
                          <p className="text-base">{wifiNetwork}</p>
                        </div>
                      </div>
                      <Dialog open={wifiSettingsOpen} onOpenChange={setWifiSettingsOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Change Network
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Wi-Fi Networks</DialogTitle>
                            <DialogDescription>Select a network to connect your device</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              {["Home-Network-5G", "Home-Network-2.4G", "Neighbor's Wi-Fi", "Guest Network"].map(
                                (network) => (
                                  <div
                                    key={network}
                                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-gray-50 ${
                                      network === wifiNetwork ? "bg-orange-50 border border-orange-200" : ""
                                    }`}
                                    onClick={() => setWifiNetwork(network)}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Wifi className="h-4 w-4 text-gray-500" />
                                      <span>{network}</span>
                                    </div>
                                    {network === wifiNetwork && <Check className="h-4 w-4 text-orange-500" />}
                                  </div>
                                ),
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="wifi-password">Password</Label>
                              <Input id="wifi-password" type="password" placeholder="Enter network password" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setWifiSettingsOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={() => {
                                setWifiStatus("Connected")
                                setWifiSettingsOpen(false)
                              }}
                            >
                              Connect
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Health</CardTitle>
                    <CardDescription>Monitor your device's status and performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Battery Level</h3>
                        <span className="text-sm font-medium">{batteryLevel}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Battery className="h-4 w-4 text-gray-500" />
                        <Progress value={batteryLevel} className="h-2" />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Storage Usage</h3>
                        <span className="text-sm font-medium">{storageUsage}%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HardDrive className="h-4 w-4 text-gray-500" />
                        <Progress value={storageUsage} className="h-2" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Used for storing camera snapshots and feeding logs</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Camera Status</h3>
                        <p className="text-sm text-gray-500">Check if the camera is functioning properly</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigateTo("/camera")}>
                        <Camera className="h-4 w-4 mr-2" />
                        Test Camera
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Management</CardTitle>
                    <CardDescription>Advanced device operations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Restart Device</h3>
                        <p className="text-sm text-gray-500">Reboot your pet feeder</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline">
                            <RotateCw className="h-4 w-4 mr-2" />
                            Restart
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Restart Device?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Your pet feeder will be unavailable for a few minutes during the restart process.
                              Scheduled feedings may be delayed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-orange-500 hover:bg-orange-600"
                              onClick={handleDeviceRestart}
                            >
                              Restart
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-red-500">Factory Reset</h3>
                        <p className="text-sm text-gray-500">Reset device to factory settings</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Factory Reset Device?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will erase all data on the device and restore it to factory settings. All schedules,
                              logs, and custom settings will be lost.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleFactoryReset}>
                              Factory Reset
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Feeding Settings */}
            {activeTab === "feeding" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Feeding Preferences</CardTitle>
                    <CardDescription>Configure how your pet feeder dispenses food</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="default-portion">Default Portion Size (grams)</Label>
                        <Input
                          id="default-portion"
                          type="number"
                          min="1"
                          value={defaultPortionSize}
                          onChange={(e) => {
                            setDefaultPortionSize(e.target.value)
                            handleInputChange()
                          }}
                        />
                        <p className="text-xs text-gray-500">Amount dispensed for scheduled feedings</p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="manual-feed-portion">Manual Feed Portion (grams)</Label>
                        <Input
                          id="manual-feed-portion"
                          type="number"
                          min="1"
                          value={manualFeedPortion}
                          onChange={(e) => {
                            setManualFeedPortion(e.target.value)
                            handleInputChange()
                          }}
                        />
                        <p className="text-xs text-gray-500">Amount dispensed when using the "Feed Now" button</p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="feeding-frequency">Feeding Frequency</Label>
                        <Select
                          value={feedingFrequency}
                          onValueChange={(value) => {
                            setFeedingFrequency(value)
                            handleInputChange()
                          }}
                        >
                          <SelectTrigger id="feeding-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="twice-daily">Twice a Day</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pause-feeding">Pause Automated Feeding</Label>
                          <p className="text-xs text-gray-500">Temporarily disable all scheduled feedings</p>
                        </div>
                        <Switch
                          id="pause-feeding"
                          checked={pauseAutomatedFeeding}
                          onCheckedChange={(checked) => {
                            setPauseAutomatedFeeding(checked)
                            handleInputChange()
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Preferences</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Food Management</CardTitle>
                    <CardDescription>Track and manage your pet's food supply</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Low Food Alert Threshold</h3>
                        <p className="text-sm text-gray-500">
                          Get notified when food level drops below this percentage
                        </p>
                      </div>
                      <Select defaultValue="20">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select %" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="30">30%</SelectItem>
                          <SelectItem value="40">40%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Food Type</h3>
                        <p className="text-sm text-gray-500">Select the type of food you're using</p>
                      </div>
                      <Select defaultValue="dry-kibble">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select food type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dry-kibble">Dry Kibble</SelectItem>
                          <SelectItem value="semi-moist">Semi-Moist</SelectItem>
                          <SelectItem value="wet-food">Wet Food</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Food Refill Reminder</h3>
                        <p className="text-sm text-gray-500">Get reminded to refill the food container</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feeding Schedule</CardTitle>
                    <CardDescription>Manage your pet's feeding times</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => navigateTo("/schedule")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Go to Schedule Page
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Data & Storage Settings */}
            {activeTab === "data" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Data Storage</CardTitle>
                    <CardDescription>Manage how your data is stored and used</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Cloud Backup</h3>
                        <p className="text-sm text-gray-500">Automatically back up your feeding data to the cloud</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Local Storage</h3>
                        <p className="text-sm text-gray-500">Keep a copy of your data on the device</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Data Retention</h3>
                        <p className="text-sm text-gray-500">How long to keep your feeding history</p>
                      </div>
                      <Select defaultValue="6-months">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Camera Storage</CardTitle>
                    <CardDescription>Manage camera snapshots and recordings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Auto-Delete Old Images</h3>
                        <p className="text-sm text-gray-500">Automatically remove old snapshots to save space</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Image Quality</h3>
                        <p className="text-sm text-gray-500">Set the quality of saved images</p>
                      </div>
                      <Select defaultValue="high">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (saves space)</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Clear All Images</h3>
                        <p className="text-sm text-gray-500">Delete all stored images and videos</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Clear
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete all images?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete all snapshots and recordings from your device. This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600">Delete All</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                    <CardDescription>Download your data for backup or analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Feeding History</h3>
                        <p className="text-sm text-gray-500">Export your complete feeding logs</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Camera Images</h3>
                        <p className="text-sm text-gray-500">Download all your saved snapshots</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export ZIP
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Complete Backup</h3>
                        <p className="text-sm text-gray-500">Export all data and settings</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === "notifications" || activeTab === "billing") && (
              <Card>
                <CardHeader>
                  <CardTitle>{activeTab === "notifications" ? "Notification Settings" : "Billing Settings"}</CardTitle>
                  <CardDescription>
                    {activeTab === "notifications"
                      ? "Manage your notification preferences"
                      : "Manage your subscription and payment methods"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-10">
                  <div className="text-center">
                    <AlertCircle className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                    <p className="text-gray-500">
                      {activeTab === "notifications"
                        ? "Detailed notification settings will be available in the next update."
                        : "Billing management will be available in the next update."}
                    </p>
                    {activeTab === "notifications" && (
                      <Button
                        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => navigateTo("/notifications")}
                      >
                        <BellRing className="h-4 w-4 mr-2" />
                        Go to Notifications Page
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Save/Discard */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4 z-10">
          <Button variant="outline" onClick={handleDiscardChanges}>
            Discard Changes
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleSaveAllChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      )}
    </Layout>
  )
}


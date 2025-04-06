"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { StatusCard } from "@/components/status-card"
import { CircularProgress } from "@/components/circular-progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { CircleIcon, Clock, Utensils } from "lucide-react"

// Sample data for the monthly feeding chart
const monthlyFeedingData = [
  { name: "Jan", grams: 48000 },
  { name: "Feb", grams: 17000 },
  { name: "Mar", grams: 37000 },
  { name: "Apr", grams: 50000 },
  { name: "June", grams: 37000 },
  { name: "July", grams: 11000 },
  { name: "Aug", grams: 37000 },
  { name: "Sep", grams: 43000 },
  { name: "Oct", grams: 45000 },
  { name: "Nov", grams: 7000 },
  { name: "Dec", grams: 37000 },
]

// Sample data for recent activity
const recentActivity = [
  { id: 1, date: "2025-04-03", time: "12:30 PM", method: "Scheduled" },
  { id: 2, date: "2025-04-03", time: "12:30 PM", method: "Scheduled" },
  { id: 3, date: "2025-04-03", time: "12:30 PM", method: "Manual" },
  { id: 4, date: "2025-04-03", time: "12:30 PM", method: "Scheduled" },
]

export default function Dashboard({ navigateTo }: { navigateTo: (path: string) => void }) {
  const [foodLevel, setFoodLevel] = useState(75) // Initial food level percentage

  const handleFeedNow = () => {
    // Decrease food level by 5% (or any amount you prefer) when feeding
    setFoodLevel((prevLevel) => Math.max(0, prevLevel - 5)) // Prevent going below 0
    alert("Feeding now!")
  }

  return (
    <Layout
      currentPath="/"
      navigateTo={navigateTo}
      title="Dashboard"
      showFeedNowButton={true}
      onFeedNow={handleFeedNow}
    >
      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Food Level Card */}
        <StatusCard
          icon={<CircleIcon className="h-5 w-5" />}
          title="Food Level"
          value={
            <div className="flex items-center">
              <CircularProgress value={foodLevel} size={90} strokeWidth={8} />
              <span className="ml-4 text-xl font-semibold">{foodLevel}%</span>
            </div>
          }
          subtitle={`Last feeding: Today, 12:30 PM`}
        />

        {/* Next Scheduled Feeding Card */}
        <StatusCard
          icon={<Clock className="h-5 w-5" />}
          title="Next Scheduled Feeding"
          value="6:00 PM"
          subtitle="Today"
        />

        {/* Total Food Dispensed Card */}
        <StatusCard
          icon={<Utensils className="h-5 w-5" />}
          title="Total food dispensed today"
          value="300g"
          subtitle="Today"
        />
      </div>

      {/* Charts and Activity Log */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Monthly Feeding Report */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Monthly Feeding Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyFeedingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="grams" fill="#FF7A5A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Log */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Recent Activity Log</CardTitle>
            <CardDescription>History of recent feeding events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium">{activity.date}</div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                  <Badge
                    variant={activity.method === "Scheduled" ? "outline" : "secondary"}
                    className={
                      activity.method === "Scheduled"
                        ? "bg-orange-100 text-orange-500 hover:bg-orange-200 border-orange-200"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {activity.method}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
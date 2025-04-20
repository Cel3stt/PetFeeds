"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { StatusCard } from "@/components/status-card"
import { CircularProgress } from "@/components/circular-progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { CircleIcon, Clock, Utensils } from "lucide-react"
import { toast } from "react-hot-toast"

const ESP32_IP = "192.168.0.100";

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

interface Feed {
  _id: string;
  date: string;
  time: string;
  portion: string;
  method: "Manual" | "Scheduled" | "Manual-Button";
  status: "Successful" | "Failed";
}

interface DashboardProps {
  navigateTo: (path: string) => void
}

export default function Dashboard({ navigateTo }: DashboardProps) {
  const [foodLevel, setFoodLevel] = useState(75)
  const [distance, setDistance] = useState<number | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [recentFeeds, setRecentFeeds] = useState<Feed[]>([])

  useEffect(() => {
    const fetchFoodLevel = async () => {
      try {
        const response = await fetch(`http://${ESP32_IP}/foodLevel`);
        if (!response.ok) {
          throw new Error(`Failed to fetch food level: ${response.status}`);
        }
        const data = await response.json();
        setFoodLevel(Math.round(data.level));
        setDistance(data.distance);
        setLastUpdate(new Date().toLocaleTimeString());
        setError(null);
      } catch (error: unknown) {
        console.error('Error fetching food level:', error);
        setError('Failed to update food level');
      }
    };

    fetchFoodLevel();
    const interval = setInterval(fetchFoodLevel, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentFeeds = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/feed-log');
      if (!response.ok) throw new Error('Failed to fetch feed logs');
      const data = await response.json();
      setRecentFeeds(data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch recent feeds:', error);
      toast.error('Failed to load recent feeds');
    }
  };

  useEffect(() => {
    fetchRecentFeeds();
    const interval = setInterval(fetchRecentFeeds, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFeedNow = async () => {
    const STANDARD_PORTION = 50;
    try {
      console.log(`Sending feed command to ESP32 at ${ESP32_IP}`);
      const feedResponse = await fetch(`http://${ESP32_IP}/feed?portion=${STANDARD_PORTION}`, {
        method: 'GET',
        headers: { 'Accept': 'text/plain' },
      });

      if (!feedResponse.ok) {
        const errorText = await feedResponse.text();
        throw new Error(`Failed to send feed command: ${errorText}`);
      }

      const feedText = await feedResponse.text();
      console.log('ESP32 response:', feedText);

      const now = new Date();
      const logResponse = await fetch("http://localhost:3000/api/feed-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: now.toISOString().split('T')[0],
          time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          portion: `${STANDARD_PORTION}g`,
          method: "Manual",
          status: "Successful"
        })
      });

      if (!logResponse.ok) {
        throw new Error("Failed to log feed");
      }

      toast.success(`Manual feeding completed (${STANDARD_PORTION}g)!`);
      fetchRecentFeeds();
    } catch (error: unknown) {
      console.error("Error during feed:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to feed: ${errorMessage}`);
      try {
        const now = new Date();
        await fetch("http://localhost:3000/api/feed-log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
            portion: `${STANDARD_PORTION}g`,
            method: "Manual",
            status: "Failed"
          })
        });
      } catch (logError) {
        console.error("Failed to log failed attempt:", logError);
      }
    }
  };

  return (
    <Layout currentPath="/" navigateTo={navigateTo} title="Dashboard">
      <div className="flex items-end justify-end gap-4 mb-2">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleFeedNow}>
          Feed now
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatusCard
          icon={<CircleIcon className="h-5 w-5" />}
          title="Food Level"
          value={
            <div className="flex items-center">
              <CircularProgress 
                value={foodLevel} 
                size={90} 
                strokeWidth={8}
                className={foodLevel <= 20 ? "text-red-500" : foodLevel <= 60 ? "text-yellow-500" : "text-green-500"}
              />
              <div className="ml-4">
                <span className={`text-xl font-semibold ${foodLevel <= 20 ? "text-red-500" : foodLevel <= 60 ? "text-yellow-500" : "text-green-500"}`}>
                  {foodLevel}%
                </span>
                {distance !== null && (
                  <p className="text-sm text-gray-500">Distance: {distance.toFixed(1)}cm</p>
                )}
                {error ? (
                  <p className="text-sm text-red-500">{error}</p>
                ) : (
                  <p className="text-sm text-gray-500">Updated: {lastUpdate}</p>
                )}
              </div>
            </div>
          }
          subtitle={
            foodLevel < 20 ? "Warning: Food level is low!" :
            foodLevel <= 60 ? "Food level is moderate" : "Food level is good"
          }
        />
        <StatusCard
          icon={<Clock className="h-5 w-5" />}
          title="Next Scheduled Feeding"
          value="6:00 PM"
          subtitle="Today"
        />
        <StatusCard
          icon={<Utensils className="h-5 w-5" />}
          title="Total food dispensed today"
          value="300g"
          subtitle="Today"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Recent Activity Log</CardTitle>
            <CardDescription>History of recent feeding events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeeds.map((feed) => (
                <div key={feed._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{feed.date}</div>
                    <div className="text-sm text-gray-500">{feed.time}</div>
                    <div className="text-xs text-gray-400">{feed.portion}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        feed.method === "Scheduled" ? "bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200" :
                        feed.method === "Manual" ? "bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200" :
                        feed.method === "Manual-Button" ? "bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200" :
                        "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200"
                      }
                    >
                      {feed.method || "Unknown"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        feed.status === "Successful" ? "bg-green-100 text-green-600 hover:bg-green-200 border-green-200" :
                        "bg-red-100 text-red-600 hover:bg-red-200 border-red-200"
                      }
                    >
                      {feed.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigateTo("/history")}>
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
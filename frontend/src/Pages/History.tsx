"use client"

import { useState, useEffect } from "react"
import { Download, Filter, Search, CalendarDays, ArrowLeft } from "lucide-react"
import { Layout } from "@/components/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import toast from "react-hot-toast"

// Sample data for feeding history
const feedingHistory = [
  { id: 1, date: "2025-04-15", time: "06:00 AM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 2, date: "2025-04-14", time: "06:00 PM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 3, date: "2025-04-14", time: "12:30 PM", portion: "120g", type: "Manual", status: "Successful" },
  { id: 4, date: "2025-04-14", time: "06:00 AM", portion: "100g", type: "Automated", status: "Failed" },
  { id: 5, date: "2025-04-13", time: "06:00 PM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 6, date: "2025-04-13", time: "12:00 PM", portion: "150g", type: "Manual", status: "Successful" },
  { id: 7, date: "2025-04-13", time: "06:00 AM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 8, date: "2025-04-12", time: "06:00 PM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 9, date: "2025-04-12", time: "12:00 PM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 10, date: "2025-04-12", time: "06:00 AM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 11, date: "2025-04-11", time: "06:00 PM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 12, date: "2025-04-11", time: "12:00 PM", portion: "120g", type: "Manual", status: "Successful" },
  { id: 13, date: "2025-04-11", time: "06:00 AM", portion: "100g", type: "Automated", status: "Failed" },
  { id: 14, date: "2025-04-10", time: "06:00 PM", portion: "100g", type: "Automated", status: "Successful" },
  { id: 15, date: "2025-04-10", time: "12:00 PM", portion: "100g", type: "Automated", status: "Successful" },
]

// Statistics data
const statisticsData = {
  totalFeeds: 152,
  successRate: "98.7%",
  averagePortion: "105g",
  mostCommonTime: "06:00 AM",
}

export default function History({ navigateTo }: { navigateTo: (path: string) => void }) {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedFeed, setSelectedFeed] = useState<any>(null)

  const itemsPerPage = 10

  // Filter and sort history
  const filteredHistory = feedingHistory.filter((feed) => {
    const matchesStatus = filterStatus === "all" ? true : feed.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesType = filterType === "all" ? true : feed.type.toLowerCase() === filterType.toLowerCase()
    const matchesSearch =
      searchQuery === ""
        ? true
        : feed.date.includes(searchQuery) ||
          feed.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feed.portion.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDate = !date ? true : feed.date === format(date, "yyyy-MM-dd")

    return matchesStatus && matchesType && matchesSearch && matchesDate
  })

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortBy === "date") {
      const dateComparison = a.date.localeCompare(b.date)
      if (dateComparison !== 0) return sortOrder === "asc" ? dateComparison : -dateComparison
      return a.time.localeCompare(b.time) * (sortOrder === "asc" ? 1 : -1)
    } else if (sortBy === "time") {
      return a.time.localeCompare(b.time) * (sortOrder === "asc" ? 1 : -1)
    } else if (sortBy === "portion") {
      const aValue = Number.parseInt(a.portion.replace("g", ""))
      const bValue = Number.parseInt(b.portion.replace("g", ""))
      return (aValue - bValue) * (sortOrder === "asc" ? 1 : -1)
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage)
  const paginatedHistory = sortedHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filterStatus, filterType, searchQuery, date, sortBy, sortOrder])

  const handleViewDetails = (feed: any) => {
    setSelectedFeed(feed)
    setDetailsDialogOpen(true)
  }

  const handleExportData = () => {
    toast.success("Feeding history exported successfully!")
  }

  const handleClearFilters = () => {
    setFilterStatus("all")
    setFilterType("all")
    setDate(undefined)
    setSortBy("date")
    setSortOrder("desc")
    setSearchQuery("")
    setFilterDialogOpen(false)
  }

  const handleBackToSchedule = () => {
    navigateTo("/schedule")
  }

  return (
    <Layout currentPath="/history" navigateTo={navigateTo} title="Feeding History" showFeedNowButton={false}>
      <div className="grid gap-6">
        {/* Header with back button */}
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" onClick={handleBackToSchedule}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Schedule
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-muted-foreground">Total Feeds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statisticsData.totalFeeds}</div>
            </CardContent>
          </Card>
        
          <Card className="border border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-muted-foreground">Average Portion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">{statisticsData.averagePortion}</div>
            </CardContent>
          </Card>
         
        </div>

        {/* Main History Card */}
        <Card>
          <CardHeader className="pb-2 bg-orange-50 m-4 p-4 rounded-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Feeding History</CardTitle>
                <CardDescription>Complete record of all feeding events</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExportData()} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filter Feeding History</DialogTitle>
                      <DialogDescription>Apply multiple filters to narrow down your feeding history.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="filter-status">Status</Label>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger id="filter-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="successful">Successful</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="filter-type">Feed Type</Label>
                        <Select value={filterType} onValueChange={setFilterType}>
                          <SelectTrigger id="filter-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="automated">Automated</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-start text-left font-normal">
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="sort-by">Sort By</Label>
                        <div className="flex gap-2">
                          <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger id="sort-by" className="flex-1">
                              <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="date">Date</SelectItem>
                              <SelectItem value="time">Time</SelectItem>
                              <SelectItem value="portion">Portion Size</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={sortOrder} onValueChange={setSortOrder}>
                            <SelectTrigger id="sort-order" className="w-[120px]">
                              <SelectValue placeholder="Order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asc">Ascending</SelectItem>
                              <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="flex justify-between">
                      <Button variant="outline" onClick={handleClearFilters}>
                        Clear Filters
                      </Button>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => setFilterDialogOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Label className="whitespace-nowrap">Quick Filter:</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="automated">Automated</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="successful">Successful</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {paginatedHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <CalendarDays className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-lg">No feeding history found</p>
                {(filterStatus !== "all" || filterType !== "all" || searchQuery || date) && (
                  <Button variant="link" onClick={handleClearFilters} className="mt-2">
                    Clear all filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Portion</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedHistory.map((feed) => (
                        <TableRow key={feed.id}>
                          <TableCell>{feed.date}</TableCell>
                          <TableCell>{feed.time}</TableCell>
                          <TableCell>{feed.portion}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                feed.type === "Automated"
                                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200"
                                  : "bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200"
                              }
                            >
                              {feed.type}
                            </Badge>
                          </TableCell>
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
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(feed)}>
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNumber

                          if (totalPages <= 5) {
                            pageNumber = i + 1
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i
                          } else {
                            pageNumber = currentPage - 2 + i
                          }

                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                isActive={currentPage === pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        })}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feed Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feeding Details</DialogTitle>
            <DialogDescription>Detailed information about this feeding event.</DialogDescription>
          </DialogHeader>
          {selectedFeed && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{selectedFeed.date}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Time</Label>
                  <p className="font-medium">{selectedFeed.time}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Portion Size</Label>
                  <p className="font-medium">{selectedFeed.portion}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Feed Type</Label>
                  <p className="font-medium">{selectedFeed.type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge
                    variant={selectedFeed.status === "Successful" ? "outline" : "destructive"}
                    className={
                      selectedFeed.status === "Successful"
                        ? "bg-green-100 text-green-600 hover:bg-green-200 border-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200 border-red-200"
                    }
                  >
                    {selectedFeed.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Feed ID</Label>
                  <p className="font-medium">#{selectedFeed.id}</p>
                </div>
              </div>

              {selectedFeed.status === "Failed" && (
                <div>
                  <Label className="text-muted-foreground">Failure Reason</Label>
                  <p className="text-red-600">Low food level detected. Please refill the food container.</p>
                </div>
              )}

              {selectedFeed.type === "Automated" && (
                <div>
                  <Label className="text-muted-foreground">Schedule</Label>
                  <p className="font-medium">Daily, 6:00 AM</p>
                </div>
              )}

              {selectedFeed.type === "Manual" && (
                <div>
                  <Label className="text-muted-foreground">Triggered By</Label>
                  <p className="font-medium">Mobile App</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

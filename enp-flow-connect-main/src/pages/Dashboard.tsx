import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Radio,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const trafficData = [
    { time: "00:00", vehicles: 120 },
    { time: "04:00", vehicles: 45 },
    { time: "08:00", vehicles: 580 },
    { time: "12:00", vehicles: 420 },
    { time: "16:00", vehicles: 650 },
    { time: "20:00", vehicles: 380 },
    { time: "23:59", vehicles: 180 },
  ];

  const tollData = [
    { location: "Checkpoint A", revenue: 12500 },
    { location: "Checkpoint B", revenue: 18200 },
    { location: "Checkpoint C", revenue: 9800 },
    { location: "Checkpoint D", revenue: 15600 },
  ];

  const vehicleTypeData = [
    { name: "Passenger", value: 6842, color: "hsl(var(--primary))" },
    { name: "Commercial", value: 2156, color: "hsl(var(--secondary))" },
    { name: "Heavy", value: 894, color: "hsl(var(--accent))" },
    { name: "Government", value: 412, color: "hsl(var(--success))" },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">System Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of RFID-ENP system performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Vehicles Registered"
            value="10,304"
            icon={Car}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="RFID Reads Today"
            value="24,567"
            icon={Radio}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Revenue Collected"
            value="$56,100"
            icon={DollarSign}
            trend={{ value: 5.3, isPositive: true }}
          />
          <StatCard
            title="Active Alerts"
            value="3"
            icon={AlertTriangle}
            description="Stolen vehicles detected"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Traffic Flow (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="vehicles"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                Toll Revenue by Checkpoint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tollData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="location"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--success))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-card lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Vehicle Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vehicleTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {vehicleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  time="2 minutes ago"
                  type="success"
                  message="Vehicle ABC-1234 passed Checkpoint B"
                />
                <ActivityItem
                  time="5 minutes ago"
                  type="warning"
                  message="Unregistered vehicle detected at Checkpoint A"
                />
                <ActivityItem
                  time="12 minutes ago"
                  type="success"
                  message="Toll payment processed: $15.00"
                />
                <ActivityItem
                  time="18 minutes ago"
                  type="alert"
                  message="Stolen vehicle XYZ-5678 flagged at Checkpoint D"
                />
                <ActivityItem
                  time="25 minutes ago"
                  type="success"
                  message="New vehicle registered: DEF-9876"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({
  time,
  type,
  message,
}: {
  time: string;
  type: "success" | "warning" | "alert";
  message: string;
}) => {
  const colors = {
    success: "bg-success/10 text-success",
    warning: "bg-accent/10 text-accent",
    alert: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3">
      <div className={`mt-0.5 h-2 w-2 rounded-full ${colors[type]}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
};

export default Dashboard;

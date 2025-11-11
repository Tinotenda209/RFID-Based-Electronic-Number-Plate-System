import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { BarChart3, TrendingUp, Navigation, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const weeklyData = [
    { day: "Mon", vehicles: 4200 },
    { day: "Tue", vehicles: 4800 },
    { day: "Wed", vehicles: 5100 },
    { day: "Thu", vehicles: 4600 },
    { day: "Fri", vehicles: 5400 },
    { day: "Sat", vehicles: 3200 },
    { day: "Sun", vehicles: 2800 },
  ];

  const hourlyData = [
    { hour: "6AM", count: 150 },
    { hour: "9AM", count: 580 },
    { hour: "12PM", count: 420 },
    { hour: "3PM", count: 490 },
    { hour: "6PM", count: 650 },
    { hour: "9PM", count: 280 },
  ];

  const checkpointData = [
    { name: "Checkpoint A", utilization: 85 },
    { name: "Checkpoint B", utilization: 92 },
    { name: "Checkpoint C", utilization: 68 },
    { name: "Checkpoint D", utilization: 78 },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Traffic Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights for traffic optimization and planning
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Weekly Traffic"
            value="35,200"
            icon={BarChart3}
            trend={{ value: 6.8, isPositive: true }}
          />
          <StatCard
            title="Peak Hour Flow"
            value="650 veh/h"
            icon={TrendingUp}
            description="6:00 PM average"
          />
          <StatCard
            title="Avg. Travel Time"
            value="18.4 min"
            icon={Navigation}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatCard
            title="Congestion Index"
            value="0.72"
            icon={Activity}
            description="Moderate flow"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Weekly Traffic Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorVehicles" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="day"
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
                  <Area
                    type="monotone"
                    dataKey="vehicles"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#colorVehicles)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Peak Hours Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="hour"
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
                    dataKey="count"
                    fill="hsl(var(--secondary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Checkpoint Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {checkpointData.map((checkpoint) => (
                <div key={checkpoint.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{checkpoint.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {checkpoint.utilization}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-primary transition-all"
                      style={{ width: `${checkpoint.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

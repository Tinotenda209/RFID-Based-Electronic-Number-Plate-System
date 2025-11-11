import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { Shield, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Enforcement = () => {
  const alerts = [
    {
      id: "ALT001",
      vehicle: "XYZ-5678",
      reason: "Stolen Vehicle",
      location: "Checkpoint D",
      time: "9:45 AM",
      priority: "critical",
      status: "active",
    },
    {
      id: "ALT002",
      vehicle: "MNO-2468",
      reason: "Warrant Outstanding",
      location: "Checkpoint A",
      time: "9:32 AM",
      priority: "high",
      status: "investigating",
    },
    {
      id: "ALT003",
      vehicle: "PQR-1357",
      reason: "Expired Registration",
      location: "Checkpoint B",
      time: "9:18 AM",
      priority: "medium",
      status: "resolved",
    },
    {
      id: "ALT004",
      vehicle: "STU-9753",
      reason: "Traffic Violation",
      location: "Checkpoint C",
      time: "8:54 AM",
      priority: "low",
      status: "resolved",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Law Enforcement</h1>
          <p className="text-muted-foreground">
            Real-time vehicle tracking and alert management
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Alerts"
            value="3"
            icon={AlertTriangle}
            description="Requires attention"
          />
          <StatCard
            title="Stolen Vehicles"
            value="1"
            icon={Shield}
            description="Currently flagged"
          />
          <StatCard
            title="Resolved Today"
            value="12"
            icon={CheckCircle2}
            trend={{ value: 15.2, isPositive: true }}
          />
          <StatCard
            title="Avg. Response Time"
            value="4.2 min"
            icon={Clock}
            trend={{ value: 8.5, isPositive: true }}
          />
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Alerts & Incidents</CardTitle>
              <Button variant="outline" size="sm">
                View All History
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-mono text-sm">
                      {alert.id}
                    </TableCell>
                    <TableCell className="font-semibold">{alert.vehicle}</TableCell>
                    <TableCell>{alert.reason}</TableCell>
                    <TableCell>{alert.location}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {alert.time}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.priority === "critical"
                            ? "destructive"
                            : alert.priority === "high"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {alert.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.status === "active"
                            ? "destructive"
                            : alert.status === "investigating"
                            ? "default"
                            : "outline"
                        }
                      >
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={alert.status === "resolved"}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Enforcement;

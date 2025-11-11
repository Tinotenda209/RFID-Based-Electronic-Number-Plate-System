import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { Car, Radio, Plus, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";

const Vehicles = () => {
  const vehicles = [
    {
      plate: "ABC-1234",
      rfid: "RF1234567890",
      owner: "John Smith",
      type: "Passenger",
      status: "active",
      registered: "2024-01-15",
    },
    {
      plate: "XYZ-5678",
      rfid: "RF0987654321",
      owner: "Jane Doe",
      type: "Commercial",
      status: "active",
      registered: "2024-02-20",
    },
    {
      plate: "DEF-9012",
      rfid: "RF1122334455",
      owner: "Bob Johnson",
      type: "Passenger",
      status: "suspended",
      registered: "2023-11-10",
    },
    {
      plate: "GHI-3456",
      rfid: "RF5544332211",
      owner: "Alice Brown",
      type: "Heavy",
      status: "active",
      registered: "2024-03-05",
    },
    {
      plate: "JKL-7890",
      rfid: "RF9988776655",
      owner: "Transport Co.",
      type: "Commercial",
      status: "active",
      registered: "2024-01-28",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vehicle Registry</h1>
            <p className="text-muted-foreground">
              Manage RFID-enabled number plates and registrations
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Register Vehicle
          </Button>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Registered"
            value="10,304"
            icon={Car}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Active RFIDs"
            value="10,256"
            icon={Radio}
            description="48 pending"
          />
          <StatCard
            title="Passenger Vehicles"
            value="6,842"
            icon={Car}
            description="66.4% of total"
          />
          <StatCard
            title="Commercial Fleet"
            value="2,156"
            icon={Car}
            description="20.9% of total"
          />
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Registered Vehicles</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by plate or RFID..."
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>RFID Tag</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.plate}>
                    <TableCell className="font-semibold">
                      {vehicle.plate}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {vehicle.rfid}
                    </TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{vehicle.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vehicle.status === "active" ? "default" : "destructive"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {vehicle.registered}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
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

export default Vehicles;

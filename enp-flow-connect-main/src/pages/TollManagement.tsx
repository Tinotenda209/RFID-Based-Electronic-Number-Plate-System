import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import RFIDSimulator from "@/components/RFIDSimulator";
import { DollarSign, TrendingUp, CreditCard, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TollManagement = () => {
  const transactions = [
    {
      id: "TXN001",
      vehicle: "ABC-1234",
      checkpoint: "Checkpoint A",
      amount: 15.0,
      time: "10:24 AM",
      status: "completed",
    },
    {
      id: "TXN002",
      vehicle: "XYZ-5678",
      checkpoint: "Checkpoint B",
      amount: 20.0,
      time: "10:18 AM",
      status: "completed",
    },
    {
      id: "TXN003",
      vehicle: "DEF-9012",
      checkpoint: "Checkpoint C",
      amount: 12.5,
      time: "10:15 AM",
      status: "pending",
    },
    {
      id: "TXN004",
      vehicle: "GHI-3456",
      checkpoint: "Checkpoint D",
      amount: 18.0,
      time: "10:12 AM",
      status: "completed",
    },
    {
      id: "TXN005",
      vehicle: "JKL-7890",
      checkpoint: "Checkpoint A",
      amount: 15.0,
      time: "10:08 AM",
      status: "failed",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Toll Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage automated toll collection
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Revenue"
            value="$56,100"
            icon={DollarSign}
            trend={{ value: 12.3, isPositive: true }}
          />
          <StatCard
            title="Transactions"
            value="3,847"
            icon={CreditCard}
            trend={{ value: 8.7, isPositive: true }}
          />
          <StatCard
            title="Active Checkpoints"
            value="4"
            icon={MapPin}
            description="All operational"
          />
          <StatCard
            title="Avg. Transaction"
            value="$14.58"
            icon={TrendingUp}
            trend={{ value: 2.1, isPositive: false }}
          />
        </div>

        <div className="mb-8">
          <RFIDSimulator />
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Toll Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Checkpoint</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                    <TableCell className="font-semibold">{txn.vehicle}</TableCell>
                    <TableCell>{txn.checkpoint}</TableCell>
                    <TableCell className="font-semibold text-success">
                      ${txn.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {txn.time}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          txn.status === "completed"
                            ? "default"
                            : txn.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {txn.status}
                      </Badge>
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

export default TollManagement;

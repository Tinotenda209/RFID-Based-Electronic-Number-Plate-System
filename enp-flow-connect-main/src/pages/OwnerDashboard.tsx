import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Car, DollarSign, History, CreditCard } from "lucide-react";
import StatCard from "@/components/StatCard";

interface Vehicle {
  id: string;
  license_plate: string;
  rfid_tag: string;
  vehicle_type: string;
  balance: number;
  status: string;
}

interface TollTransaction {
  id: string;
  toll_amount: number;
  transaction_time: string;
  transaction_status: string;
  toll_station_id: string;
  balance_after: number;
  balance_before: number;
  rfid_tag: string;
  vehicle_id: string;
  payment_method: string;
}

interface PaymentTransaction {
  id: string;
  toll_amount: number;
  transaction_time: string;
  transaction_status: string;
  balance_after: number;
  balance_before: number;
  vehicle_id: string;
  payment_method: string;
}

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [tollTransactions, setTollTransactions] = useState<TollTransaction[]>([]);
  const [paymentTransactions, setPaymentTransactions] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState<Vehicle | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || userRole !== 'owner')) {
      navigate("/auth");
    }
  }, [user, userRole, authLoading, navigate]);

  useEffect(() => {
    if (user && userRole === 'owner') {
      fetchVehicles();
      fetchTollTransactions();
      fetchPaymentTransactions();
    }
  }, [user, userRole]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', user?.id);

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vehicles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTollTransactions = async () => {
    try {
      if (!user?.id) return;
      
      // Get vehicle IDs for this owner
      const vehicleIds = vehicles.map(v => v.id);
      
      const { data, error } = await supabase
        .from('toll_transactions')
        .select('*')
        .in('vehicle_id', vehicleIds)
        .eq('payment_method', 'rfid')
        .order('transaction_time', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTollTransactions(data || []);
    } catch (error) {
      console.error('Error fetching toll transactions:', error);
    }
  };

  const fetchPaymentTransactions = async () => {
    try {
      if (!user?.id) return;
      
      // Get vehicle IDs for this owner
      const vehicleIds = vehicles.map(v => v.id);
      
      const { data, error } = await supabase
        .from('toll_transactions')
        .select('*')
        .in('vehicle_id', vehicleIds)
        .eq('payment_method', 'credit_card')
        .order('transaction_time', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPaymentTransactions(data || []);
    } catch (error) {
      console.error('Error fetching payment transactions:', error);
    }
  };

  const handlePayment = async () => {
    if (!selectedVehicle || !paymentAmount) {
      toast({
        title: "Error",
        description: "Please select a vehicle and enter an amount",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setProcessingPayment(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          vehicleId: selectedVehicle,
          amount,
          paymentMethod: 'credit_card',
        },
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Success",
          description: `Payment of $${amount} processed successfully`,
        });
        setPaymentAmount("");
        setSelectedVehicle("");
        fetchVehicles();
        fetchPaymentTransactions();
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const totalBalance = vehicles.reduce((sum, v) => sum + Number(v.balance), 0);
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const totalTollPaid = tollTransactions.reduce((sum, t) => sum + Number(t.toll_amount), 0);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Manage your vehicles and toll transactions</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <StatCard
            title="Total Balance"
            value={`$${totalBalance.toFixed(2)}`}
            icon={DollarSign}
            description="Across all vehicles"
          />
          <StatCard
            title="Active Vehicles"
            value={activeVehicles.toString()}
            icon={Car}
            description={`${vehicles.length} total vehicles`}
          />
          <StatCard
            title="Total Tolls Paid"
            value={`$${totalTollPaid.toFixed(2)}`}
            icon={History}
            description={`${tollTransactions.length} toll transactions`}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>My Vehicles</CardTitle>
              <CardDescription>Click on a vehicle to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License Plate</TableHead>
                    <TableHead>RFID Tag</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow 
                      key={vehicle.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedVehicleDetails(vehicle)}
                    >
                      <TableCell className="font-semibold">{vehicle.license_plate}</TableCell>
                      <TableCell className="text-muted-foreground">{vehicle.rfid_tag}</TableCell>
                      <TableCell>{vehicle.vehicle_type}</TableCell>
                      <TableCell className="font-semibold text-success">
                        ${Number(vehicle.balance).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={vehicle.status === 'active' ? 'default' : 'secondary'}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {vehicles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No vehicles registered
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Add Balance
              </CardTitle>
              <CardDescription>Recharge your vehicle's toll balance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-select">Select Vehicle</Label>
                <select
                  id="vehicle-select"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.license_plate} - ${Number(vehicle.balance).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="50.00"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <Button
                onClick={handlePayment}
                disabled={processingPayment}
                className="w-full"
              >
                {processingPayment ? "Processing..." : "Process Payment"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {selectedVehicleDetails && (
          <Card className="shadow-card mb-6">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>Detailed information about {selectedVehicleDetails.license_plate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">License Plate</p>
                  <p className="text-lg font-semibold">{selectedVehicleDetails.license_plate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">RFID Tag</p>
                  <p className="text-lg font-semibold">{selectedVehicleDetails.rfid_tag}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Type</p>
                  <p className="text-lg font-semibold">{selectedVehicleDetails.vehicle_type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-lg font-semibold text-success">${Number(selectedVehicleDetails.balance).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedVehicleDetails.status === 'active' ? 'default' : 'secondary'}>
                    {selectedVehicleDetails.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Toll Transaction History</CardTitle>
              <CardDescription>Toll charges deducted from your vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Balance After</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tollTransactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="text-sm">
                        {new Date(txn.transaction_time).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-semibold text-destructive">
                        -${Number(txn.toll_amount).toFixed(2)}
                      </TableCell>
                      <TableCell>${Number(txn.balance_after).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            txn.transaction_status === "success" ? "default" : "destructive"
                          }
                        >
                          {txn.transaction_status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {tollTransactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No toll transactions yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Recharge payments made to your vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Balance After</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentTransactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="text-sm">
                        {new Date(txn.transaction_time).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-semibold text-success">
                        +${Math.abs(Number(txn.toll_amount)).toFixed(2)}
                      </TableCell>
                      <TableCell>${Number(txn.balance_after).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            txn.transaction_status === "success" ? "default" : "destructive"
                          }
                        >
                          {txn.transaction_status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {paymentTransactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No payment history yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

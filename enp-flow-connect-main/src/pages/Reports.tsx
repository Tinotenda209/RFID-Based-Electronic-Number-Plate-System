import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  const reports = [
    {
      id: "RPT001",
      name: "Daily Traffic Summary",
      type: "Traffic",
      generated: "2024-11-02 09:00",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      id: "RPT002",
      name: "Weekly Toll Revenue",
      type: "Financial",
      generated: "2024-11-01 18:00",
      size: "1.8 MB",
      format: "Excel",
    },
    {
      id: "RPT003",
      name: "Law Enforcement Alerts",
      type: "Security",
      generated: "2024-11-02 06:00",
      size: "856 KB",
      format: "PDF",
    },
    {
      id: "RPT004",
      name: "Vehicle Registration Report",
      type: "Registry",
      generated: "2024-10-31 12:00",
      size: "3.2 MB",
      format: "Excel",
    },
    {
      id: "RPT005",
      name: "Monthly Analytics Dashboard",
      type: "Analytics",
      generated: "2024-10-30 23:59",
      size: "5.1 MB",
      format: "PDF",
    },
  ];

  const reportTemplates = [
    {
      name: "Traffic Flow Analysis",
      description: "Hourly and daily traffic patterns with peak hour analysis",
      category: "Traffic",
    },
    {
      name: "Revenue Collection Report",
      description: "Toll collection summary by checkpoint and time period",
      category: "Financial",
    },
    {
      name: "Compliance Audit",
      description: "Vehicle registration compliance and violations",
      category: "Compliance",
    },
    {
      name: "System Performance",
      description: "RFID reader performance and uptime statistics",
      category: "Technical",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate and download system reports
          </p>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Generate New Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <div
                    key={template.name}
                    className="flex items-start justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h4 className="font-semibold">{template.name}</h4>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <Button size="sm" className="ml-4">
                      Generate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Calendar className="h-4 w-4" />
                Schedule Automated Report
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <Filter className="h-4 w-4" />
                Custom Report Builder
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <Download className="h-4 w-4" />
                Export All Data
              </Button>

              <div className="mt-6 rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-semibold">Report Statistics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Reports Generated Today
                    </span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Week</span>
                    <span className="font-semibold">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Storage</span>
                    <span className="font-semibold">156 MB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{report.name}</h4>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{report.generated}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <Badge variant="outline" className="ml-1">
                          {report.format}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;

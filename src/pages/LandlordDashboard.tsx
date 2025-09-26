import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Home, 
  Eye, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Users,
  Star,
  MapPin,
  Edit,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

const LandlordDashboard = () => {
  // Mock landlord data
  const landlord = {
    name: "Sarah Njeri",
    email: "sarah.njeri@example.com",
    totalProperties: 12,
    activeListings: 8,
    totalViews: 245,
    monthlyRevenue: 1200000,
  };

  // Mock property listings
  const properties = [
    {
      id: 1,
      title: "Modern 2-Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      price: "KSh 80,000",
      status: "Available",
      views: 45,
      inquiries: 8,
      image: "/placeholder.svg",
      listedDate: "2024-01-01",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Spacious 3-Bedroom House in Karen",
      location: "Karen, Nairobi",
      price: "KSh 150,000",
      status: "Occupied",
      views: 32,
      inquiries: 5,
      image: "/placeholder.svg",
      listedDate: "2023-12-15",
      rating: 4.8,
    },
  ];

  // Mock recent inquiries
  const recentInquiries = [
    {
      id: 1,
      propertyTitle: "Modern 2-Bedroom Apartment in Kilimani",
      tenantName: "John Kamau",
      message: "I'm interested in viewing this property. When would be a good time?",
      date: "2024-01-12",
      status: "Pending",
    },
    {
      id: 2,
      propertyTitle: "Spacious 3-Bedroom House in Karen",
      tenantName: "Mary Wanjiku",
      message: "Is this property still available? I'd like to schedule a viewing.",
      date: "2024-01-11",
      status: "Responded",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Landlord Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your property listings and track performance
            </p>
          </div>
          <Button variant="hero" size="lg" asChild>
            <Link to="/list-property">
              <Plus className="h-4 w-4 mr-2" />
              List New Property
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                  <p className="text-2xl font-bold text-primary">{landlord.totalProperties}</p>
                </div>
                <Home className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold text-primary">{landlord.activeListings}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-primary">{landlord.totalViews}</p>
                </div>
                <Eye className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-primary">KSh {landlord.monthlyRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Property Listings</h2>
              <Button variant="accent" asChild>
                <Link to="/list-property">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Property
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {properties.map((property) => (
                <Card key={property.id} className="shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{property.title}</h3>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="text-lg font-bold text-primary">{property.price}/month</span>
                          <Badge 
                            variant={property.status === "Available" ? "secondary" : "outline"}
                            className={property.status === "Available" ? "bg-success text-success-foreground" : ""}
                          >
                            {property.status}
                          </Badge>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-accent fill-current mr-1" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Views:</span>
                            <span className="ml-1 font-semibold">{property.views}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Inquiries:</span>
                            <span className="ml-1 font-semibold">{property.inquiries}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Listed:</span>
                            <span className="ml-1 font-semibold">{property.listedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="inquiries" className="space-y-6">
            <h2 className="text-2xl font-semibold">Recent Inquiries</h2>
            
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <Card key={inquiry.id} className="shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{inquiry.propertyTitle}</h3>
                        <p className="text-sm text-muted-foreground">From: {inquiry.tenantName}</p>
                        <p className="text-sm text-muted-foreground">{inquiry.date}</p>
                      </div>
                      <Badge 
                        variant={inquiry.status === "Pending" ? "destructive" : "secondary"}
                        className={inquiry.status === "Responded" ? "bg-success text-success-foreground" : ""}
                      >
                        {inquiry.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-4 p-3 bg-muted rounded-lg">
                      {inquiry.message}
                    </p>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="hero">
                        Respond
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule Viewing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Performance Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Property Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <div key={property.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{property.title}</p>
                          <p className="text-xs text-muted-foreground">{property.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{property.views} views</p>
                          <p className="text-xs text-muted-foreground">{property.inquiries} inquiries</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Monthly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>New Listings</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Properties Rented</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Total Inquiries</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Average Response Time</span>
                      <span className="font-semibold">2.5 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LandlordDashboard;
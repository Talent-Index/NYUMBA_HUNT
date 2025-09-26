import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Eye, 
  Calendar, 
  MapPin, 
  Star, 
  Search,
  Bell,
  Settings,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "John Kamau",
    email: "john.kamau@example.com",
    joinedDate: "January 2024",
    profileCompletion: 85,
  };

  // Mock saved properties
  const savedProperties = [
    {
      id: 1,
      title: "Modern 2-Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      price: "KSh 80,000",
      image: "/placeholder.svg",
      savedDate: "2024-01-10",
    },
    {
      id: 2,
      title: "Spacious 3-Bedroom House in Karen",
      location: "Karen, Nairobi",
      price: "KSh 150,000",
      image: "/placeholder.svg",
      savedDate: "2024-01-08",
    },
  ];

  // Mock viewing history
  const viewingHistory = [
    {
      id: 1,
      title: "Executive 1-Bedroom Studio in Westlands",
      location: "Westlands, Nairobi",
      price: "KSh 60,000",
      viewedDate: "2024-01-12",
      rating: 4,
    },
    {
      id: 2,
      title: "Luxury Villa in Runda",
      location: "Runda, Nairobi",
      price: "KSh 300,000",
      viewedDate: "2024-01-11",
      rating: 5,
    },
  ];

  // Mock scheduled viewings
  const scheduledViewings = [
    {
      id: 1,
      title: "Modern 2-Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "Confirmed",
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
              Welcome back, {user.name}!
            </h1>
            <p className="text-muted-foreground">
              Manage your property search and saved listings
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/profile">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saved Properties</p>
                  <p className="text-2xl font-bold text-primary">{savedProperties.length}</p>
                </div>
                <Heart className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Properties Viewed</p>
                  <p className="text-2xl font-bold text-primary">{viewingHistory.length}</p>
                </div>
                <Eye className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scheduled Viewings</p>
                  <p className="text-2xl font-bold text-primary">{scheduledViewings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Completion</p>
                  <p className="text-2xl font-bold text-primary">{user.profileCompletion}%</p>
                </div>
                <User className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="saved">Saved Properties</TabsTrigger>
            <TabsTrigger value="history">Viewing History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Viewings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Saved Properties</h2>
              <Button variant="accent" asChild>
                <Link to="/properties">
                  <Search className="h-4 w-4 mr-2" />
                  Find More Properties
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <Card key={property.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    >
                      <Heart className="h-4 w-4 fill-current text-accent" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">{property.title}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">{property.price}</span>
                      <Button size="sm" variant="hero" asChild>
                        <Link to={`/property/${property.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-semibold">Viewing History</h2>
            
            <div className="space-y-4">
              {viewingHistory.map((property) => (
                <Card key={property.id} className="shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{property.title}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-primary">{property.price}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < property.rating
                                    ? "text-accent fill-current"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-2">
                          Viewed on {property.viewedDate}
                        </p>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/property/${property.id}`}>View Again</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-6">
            <h2 className="text-2xl font-semibold">Scheduled Viewings</h2>
            
            <div className="space-y-4">
              {scheduledViewings.map((viewing) => (
                <Card key={viewing.id} className="shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{viewing.title}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {viewing.location}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-primary" />
                            <span>{viewing.date} at {viewing.time}</span>
                          </div>
                          <Badge variant="secondary" className="bg-success text-success-foreground">
                            {viewing.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="destructive">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
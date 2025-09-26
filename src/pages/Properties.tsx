import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Bed, Bath, Car, Heart, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Properties = () => {
  // Mock properties data
  const properties = [
    {
      id: 1,
      title: "Modern 2-Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      price: "KSh 80,000",
      period: "month",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      image: "/placeholder.svg",
      type: "Apartment",
      status: "Available",
      featured: true,
    },
    {
      id: 2,
      title: "Spacious 3-Bedroom House in Karen",
      location: "Karen, Nairobi",
      price: "KSh 150,000",
      period: "month",
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      image: "/placeholder.svg",
      type: "House",
      status: "Available",
      featured: false,
    },
    {
      id: 3,
      title: "Executive 1-Bedroom Studio in Westlands",
      location: "Westlands, Nairobi",
      price: "KSh 60,000",
      period: "month",
      bedrooms: 1,
      bathrooms: 1,
      parking: 1,
      image: "/placeholder.svg",
      type: "Studio",
      status: "Available",
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Home</h1>
          <p className="text-muted-foreground">Discover amazing rental properties across Kenya</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  className="pl-10"
                />
              </div>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kilimani">Kilimani</SelectItem>
                  <SelectItem value="westlands">Westlands</SelectItem>
                  <SelectItem value="karen">Karen</SelectItem>
                  <SelectItem value="kileleshwa">Kileleshwa</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50000">KSh 0 - 50,000</SelectItem>
                  <SelectItem value="50000-100000">KSh 50,000 - 100,000</SelectItem>
                  <SelectItem value="100000-200000">KSh 100,000 - 200,000</SelectItem>
                  <SelectItem value="200000+">KSh 200,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="accent">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {properties.length} properties
          </p>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.featured && (
                    <Badge variant="destructive" className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    {property.status}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {property.title}
                  </CardTitle>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">
                    {property.price}
                    <span className="text-sm font-normal text-muted-foreground">/{property.period}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms} bath
                  </div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    {property.parking} parking
                  </div>
                </div>
                
                <Button asChild className="w-full" variant="hero">
                  <Link to={`/property/${property.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Properties;
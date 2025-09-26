import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Calendar,
  Wifi,
  Tv,
  AirVent,
  Shield,
  Camera
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();

  // Mock property data
  const property = {
    id: 1,
    title: "Modern 2-Bedroom Apartment in Kilimani",
    location: "Kilimani, Nairobi",
    price: "KSh 80,000",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    size: "120 sqm",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    type: "Apartment",
    status: "Available",
    featured: true,
    description: "This stunning modern apartment offers the perfect blend of comfort and style in the heart of Kilimani. Featuring spacious rooms, modern finishes, and excellent amenities, this property is ideal for professionals and small families looking for quality accommodation in a prime location.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Cable TV", icon: Tv },
      { name: "Air Conditioning", icon: AirVent },
      { name: "Security", icon: Shield },
      { name: "CCTV", icon: Camera },
    ],
    landlord: {
      name: "Sarah Njeri",
      phone: "+254 722 123 456",
      email: "sarah.njeri@example.com",
      verified: true,
    },
    availableFrom: "2024-01-15",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${index + 2}`}
                className="w-full h-32 lg:h-[160px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Info */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {property.featured && (
                    <Badge variant="destructive" className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    {property.status}
                  </Badge>
                  <Badge variant="outline">{property.type}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">{property.parking}</div>
                    <div className="text-sm text-muted-foreground">Parking</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="font-semibold">{property.size}</div>
                    <div className="text-sm text-muted-foreground">Size</div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={amenity.name} className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Contact */}
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {property.price}
                  </div>
                  <div className="text-muted-foreground">per {property.period}</div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Available from {property.availableFrom}
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Button className="w-full" variant="hero" size="lg">
                    Schedule Viewing
                  </Button>
                  <Button className="w-full" variant="accent">
                    Contact Landlord
                  </Button>
                  <Button className="w-full" variant="outline">
                    Ask Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Landlord Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{property.landlord.name}</span>
                    {property.landlord.verified && (
                      <Badge variant="secondary" className="bg-success text-success-foreground">
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      {property.landlord.phone}
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      {property.landlord.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
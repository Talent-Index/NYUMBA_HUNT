import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  X, 
  Home, 
  MapPin, 
  DollarSign,
  Camera,
  Wifi,
  Tv,
  AirVent,
  Shield,
  Car,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePropertyContract, PropertyData } from "@/lib/propertyContract";
import { useCurrentAccount } from "@mysten/dapp-kit";

const ListProperty = () => {
  const { toast } = useToast();
  const currentAccount = useCurrentAccount();
  const { propertyContract, signAndExecuteTransactionBlock, isConnected } = usePropertyContract();
  
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    propertyType: '',
    description: '',
  });

  const amenities = [
    { id: "wifi", name: "WiFi", icon: Wifi },
    { id: "tv", name: "Cable TV", icon: Tv },
    { id: "ac", name: "Air Conditioning", icon: AirVent },
    { id: "security", name: "24/7 Security", icon: Shield },
    { id: "parking", name: "Parking", icon: Car },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload these to a cloud storage service
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!isConnected || !currentAccount) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to list a property.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.title || !formData.location || !formData.price || !formData.propertyType) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Convert price to smallest unit (cents)
      const priceInCents = Math.round(parseFloat(formData.price) * 100);

      const propertyData: PropertyData = {
        title: formData.title,
        location: formData.location,
        price: priceInCents,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        parking: parseInt(formData.parking) || 0,
        propertyType: formData.propertyType,
        description: formData.description,
      };

      // Create property on-chain
      const transactionDigest = await propertyContract.createProperty(
        propertyData,
        signAndExecuteTransactionBlock
      );

      toast({
        title: "Property Listed Successfully!",
        description: `Your property has been listed on-chain. Transaction: ${transactionDigest.slice(0, 8)}...`,
        variant: "default",
      });

      // Reset form
      setFormData({
        title: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        parking: '',
        propertyType: '',
        description: '',
      });
      setSelectedImages([]);
      setSelectedAmenities([]);

    } catch (error) {
      console.error('Error listing property:', error);
      toast({
        title: "Error Listing Property",
        description: "There was an error listing your property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">List Your Property</h1>
          <p className="text-muted-foreground">
            Fill in the details below to list your property on Nyumba Hunt
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-5 w-5 mr-2 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Modern 2-Bedroom Apartment in Kilimani"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property, its features, and what makes it special..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="bungalow">Bungalow</SelectItem>
                        <SelectItem value="maisonette">Maisonette</SelectItem>
                        <SelectItem value="bedsitter">Bedsitter</SelectItem>
                        <SelectItem value="single-room">Single Room</SelectItem>
                        <SelectItem value="double-room">Double Room</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="cottage">Cottage</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="size">Size (sqm)</Label>
                    <Input
                      id="size"
                      type="number"
                      placeholder="120"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="parking">Parking Spaces</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Parking" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Pricing */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Location & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    placeholder="e.g., Lenana Road, Kilimani, Nairobi"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="area">Area/Neighborhood</Label>
                    <Input
                      id="area"
                      placeholder="e.g., Kilimani"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Monthly Rent (KSh)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="80000"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="deposit">Security Deposit (KSh)</Label>
                    <Input
                      id="deposit"
                      type="number"
                      placeholder="160000"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="available-from">Available From</Label>
                  <Input
                    id="available-from"
                    type="date"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amenities */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {amenities.map((amenity) => {
                  const Icon = amenity.icon;
                  const isSelected = selectedAmenities.includes(amenity.id);
                  
                  return (
                    <div
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2 text-primary" />
                Property Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Property Photos</h3>
                  <p className="text-muted-foreground mb-4">
                    Add high-quality photos to attract more tenants
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button type="button" variant="accent" asChild>
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Photos
                    </label>
                  </Button>
                </div>
                
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                            Cover Photo
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+254 722 123 456"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-center space-x-4">
            <Button type="button" variant="outline" size="lg">
              Save as Draft
            </Button>
            <Button type="submit" variant="hero" size="lg">
              List Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListProperty;
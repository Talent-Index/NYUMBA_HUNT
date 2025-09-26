import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Star, 
  Heart,
  Shield,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");

  // Mock featured properties
  const featuredProperties = [
    {
      id: 1,
      title: "Modern 2-Bedroom Apartment in Kilimani",
      location: "Kilimani, Nairobi",
      price: "KSh 80,000",
      image: "/placeholder.svg",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      title: "Luxury 3-Bedroom House in Karen",
      location: "Karen, Nairobi",
      price: "KSh 150,000",
      image: "/placeholder.svg",
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      rating: 4.9,
      featured: true,
    },
    {
      id: 3,
      title: "Executive Studio in Westlands",
      location: "Westlands, Nairobi",
      price: "KSh 60,000",
      image: "/placeholder.svg",
      bedrooms: 1,
      bathrooms: 1,
      parking: 1,
      rating: 4.7,
      featured: true,
    },
  ];

  // Mock testimonials
  const testimonials = [
    {
      name: "Sarah Wanjiku",
      role: "Marketing Executive",
      content: "Found my dream apartment in just 3 days! The platform made it so easy to filter and find exactly what I was looking for.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "David Kimani",
      role: "Software Developer",
      content: "As a landlord, Nyumba Hunt has helped me find quality tenants quickly. The verification process gives me confidence.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "Grace Akinyi",
      role: "Teacher",
      content: "The detailed property photos and virtual tours saved me so much time. No more unnecessary trips across the city!",
      rating: 5,
      image: "/placeholder.svg",
    },
  ];

  const stats = [
    { label: "Properties Listed", value: "10,000+", icon: TrendingUp },
    { label: "Happy Tenants", value: "25,000+", icon: Users },
    { label: "Verified Landlords", value: "2,500+", icon: Shield },
    { label: "Cities Covered", value: "15+", icon: MapPin },
  ];

  const features = [
    {
      title: "Verified Listings",
      description: "All properties are verified for authenticity and accuracy",
      icon: Shield,
    },
    {
      title: "Virtual Tours",
      description: "Explore properties from the comfort of your home",
      icon: Play,
    },
    {
      title: "Instant Messaging",
      description: "Connect directly with landlords and agents",
      icon: Users,
    },
    {
      title: "Smart Matching",
      description: "AI-powered recommendations based on your preferences",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Beautiful Kenyan residential property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  🏠 Kenya's #1 Property Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Find Your Perfect
                  <span className="block text-accent">Nyumba</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  Discover verified rental properties across Kenya. Save time, money, and effort with our smart house hunting platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" variant="accent" asChild>
                  <Link to="/properties">
                    <Search className="h-5 w-5 mr-2" />
                    Start House Hunting
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                  <Link to="/list-property">
                    List Your Property
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Search Card */}
            <div className="lg:ml-auto">
              <Card className="shadow-elevated border-0 bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-center text-xl">Quick Property Search</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter location (e.g., Kilimani, Nairobi)"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50000">KSh 0 - 50K</SelectItem>
                        <SelectItem value="50000-100000">KSh 50K - 100K</SelectItem>
                        <SelectItem value="100000-200000">KSh 100K - 200K</SelectItem>
                        <SelectItem value="200000+">KSh 200K+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full" variant="hero" size="lg" asChild>
                    <Link to="/properties">
                      <Search className="h-4 w-4 mr-2" />
                      Search Properties
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked premium properties from verified landlords across Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="destructive" className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-3 right-3 flex items-center bg-background/90 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-accent fill-current mr-1" />
                    <span className="text-xs font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary">
                      {property.price}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-1" />
                      {property.parking}
                    </div>
                  </div>
                  
                  <Button asChild className="w-full" variant="hero">
                    <Link to={`/property/${property.id}`}>
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/properties">
                View All Properties
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Nyumba Hunt?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of house hunting with our innovative platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who found their perfect home
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-md border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-accent fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Kenyans who have found their perfect rental properties through Nyumba Hunt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="accent" asChild>
              <Link to="/register">
                Get Started for Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link to="/properties">
                Browse Properties
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold">Nyumba Hunt</span>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Kenya's most trusted platform for finding verified rental properties.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Tenants</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/properties" className="hover:text-accent transition-colors">Search Properties</Link></li>
                <li><Link to="/register" className="hover:text-accent transition-colors">Create Account</Link></li>
                <li><Link to="/dashboard" className="hover:text-accent transition-colors">My Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Landlords</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/list-property" className="hover:text-accent transition-colors">List Property</Link></li>
                <li><Link to="/landlord-dashboard" className="hover:text-accent transition-colors">Landlord Dashboard</Link></li>
                <li><Link to="/register" className="hover:text-accent transition-colors">Join as Landlord</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Nyumba Hunt. All rights reserved. Made with ❤️ in Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
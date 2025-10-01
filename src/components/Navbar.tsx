import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Search, User, Home, MapPin, Plus, Wallet, LogOut } from "lucide-react";
import { useCurrentAccount } from "@/lib/sui";
import ConnectWalletButton from "./ConnectWalletButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentAccount = useCurrentAccount();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: MapPin },
    { name: "List Property", href: "/list-property", icon: Plus },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/nyumba_hunt_logo.jpeg"
              alt="Nyumba Hunt"
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="text-xl font-bold text-primary">Nyumba Hunt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {currentAccount ? (
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  <Wallet className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            ) : (
              <ConnectWalletButton />
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                <div className="border-t pt-4 space-y-2">
                  {currentAccount ? (
                    <div className="px-4 space-y-2">
                      <div className="flex items-center justify-center">
                        <Badge variant="secondary" className="bg-success text-success-foreground">
                          <Wallet className="h-3 w-3 mr-1" />
                          Wallet Connected
                        </Badge>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50"
                      >
                        <User className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="px-4">
                      <ConnectWalletButton />
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
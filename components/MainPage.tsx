"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, Calendar, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Script from "next/script";
import { useSession } from "next-auth/react"; // Import useSession
import { useRouter } from "next/navigation";

interface Plan {
  name: string;
  expiryDate: string;
  totalSearches: number;
  remainingSearches: number;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function MainPage() {
  const { data: session,status } = useSession(); // Access session data
  const [plan, setPlan] = useState<Plan | null>(null);
  const [address, setAddress] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const autoCompleteRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  if (!session) {
    router.push("/login"); // Redirect to login page if not logged in
    return null;
  }

  useEffect(() => {
    // Simulating fetching plan from DB
    setTimeout(() => {
      setPlan({
        name: "Premium Plan",
        expiryDate: "2023-12-31",
        totalSearches: 100,
        remainingSearches: 75,
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLoaded && autoCompleteRef.current) {
      const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["address"],
      };

      const autocomplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        options
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setAddress(place.name);
      });
    }
  }, [isLoaded]);

  const handleSearch = () => {
    console.log("Searching for:", address);
    // Implement search functionality here
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // Implement checkout functionality here
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {session?.user?.email?.split(".")[0] ?? "Guest"}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Access property details with ease
            </p>
          </header>

          {plan ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Active Plan: {plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-blue-500" />
                    <span>Expiry Date: {plan.expiryDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="text-blue-500" />
                    <span>
                      Remaining Searches: {plan.remainingSearches}/
                      {plan.totalSearches}
                    </span>
                  </div>
                </div>
                <Progress
                  value={(plan.remainingSearches / plan.totalSearches) * 100}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-6">
                <p className="text-lg font-semibold text-gray-800">
                  No Active Plan
                </p>
                <Button onClick={handleCheckout} className="mt-4">
                  Get a Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Request Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  ref={autoCompleteRef}
                  type="text"
                  placeholder="Enter US property address"
                  className="pl-10 py-6"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleSearch} className="flex-1">
                  Search
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={handleCheckout}
                  variant="outline"
                  className="flex-1"
                >
                  Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

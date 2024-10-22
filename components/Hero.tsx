"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Script from "next/script";

declare global {
  interface Window {
    google: any;
  }
}

export default function Hero() {
  const [address, setAddress] = useState("");
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="flex items-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            <div className="lg:col-span-3 space-y-8">
              <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
                Get the history of any property within seconds
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Access detailed records, ownership history, and legal
                information for any property—quick, reliable, and all in one
                place.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-grow">
                  <label htmlFor="hero-input" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      ref={autoCompleteRef}
                      type="text"
                      id="hero-input"
                      name="hero-input"
                      className="pl-10 py-6"
                      placeholder="Enter US property address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <Button size="lg" className="w-full sm:w-auto">
                  Get Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span>4.9 Star Rating</span>
                </div>
                <div>10K+ Searches</div>
                <div>Covers every US property</div>
              </div>
            </div>

            <div className="lg:col-span-4 mt-10 lg:mt-0 hidden md:block">
              <Image
                src="/image-wbg.png"
                width={800}
                height={600}
                alt="Property Search Illustration"
                className="w-full rounded-xl"
              />
            </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Instant Results",
              "Comprehensive Data",
              "Legal Compliance",
              "User-Friendly Interface",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div className="text-base font-semibold text-gray-800">
                  {feature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

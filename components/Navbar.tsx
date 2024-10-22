"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession(); // Get the current session data

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              PropertyRecords
            </span>
          </Link>
          <div className="flex items-center">
            {session ? (
              // If the user is logged in, show the Logout button
              <Button
                variant="outline"
                className="inline-flex"
                onClick={() => signOut({ callbackUrl: "/" })} // Redirect to homepage after logout
              >
                Log out
              </Button>
            ) : (
              // If the user is logged out, show the Login button
              <Button
                variant="outline"
                className="inline-flex"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

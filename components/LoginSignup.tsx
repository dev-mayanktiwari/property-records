"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, Mail, Lock } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      if (isLogin) {
        const response = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        console.log("SignIn response:", response); // Log the response

        if (response?.error) {
          console.log("Login error:", response.error);
          throw new Error(response.error);
        } else if (response?.ok) {
          router.push("/dashboard");
        } else {
          throw new Error("An error occurred. Please try again.");
        }
      } else {
        const response = await axios.post("/api/signup", {
          email,
          password,
        });
        setSuccess("Account created successfully. Please login.");
        console.log("Signup response:", response.data);
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      const errorMessage =
        error.response?.data?.error || error.message || "Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to {isLogin ? "login to" : "create"} your
            account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="login-mode"
                  checked={isLogin}
                  onCheckedChange={setIsLogin}
                />
                <Label htmlFor="login-mode" className="text-sm text-gray-600">
                  {isLogin ? "Login" : "Sign up"}
                </Label>
              </div>
            </div>
            {error && (
              <div className="pt-5 text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="pt-5 text-green-600 text-sm text-center">
                {success}
              </div>
            )}
            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
          {isLogin && (
            <Link
              href="#"
              className="text-sm text-center text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          )}
          <Link
            href="/"
            className="text-sm text-center text-gray-600 hover:underline"
          >
            Back to homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

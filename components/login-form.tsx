"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AppLink } from "./ui/app-link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold">School Management System</h1>

                <p className="text-sm text-muted-foreground">
                  Sign in to continue to your account.
                </p>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <AppLink href="/forgot-password" className="text-sm">
                    Forgot Password?
                  </AppLink>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              {/* Login Button */}
              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Field>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              {/* Signup Button */}
              <Field>
                <AppLink href="/signup">
                  <Button type="button" variant="outline" className="w-full">
                    Create Account
                  </Button>
                </AppLink>
              </Field>

              {/* Signup Link */}
              <FieldDescription className="text-center">
                Do not have an account?{" "}
                <AppLink href="/signup">Sign Up</AppLink>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Right Image */}
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/login-image.jpg"
              alt="Login"
              fill
              priority
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-sm">
        By signing in, you agree to our{" "}
        <AppLink href="/terms" className="underline">
          Terms of Service
        </AppLink>{" "}
        and{" "}
        <AppLink href="/privacy" className="underline">
          Privacy Policy
        </AppLink>
        .
      </FieldDescription>
    </div>
  );
}

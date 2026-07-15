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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Image */}
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/images/signup-images.jpg"
              alt="Signup"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

          {/* Right Form */}
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your information below.
                </p>
              </div>

              {/* Username */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <FieldDescription>
                  Password should be at least 8 characters.
                </FieldDescription>
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </Field>

              {/* Login */}
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By creating an account, you agree to our{" "}
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

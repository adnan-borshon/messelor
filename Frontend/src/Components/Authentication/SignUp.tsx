import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

import Role from "@/Components/Authentication/Role.tsx"  // ⬅️ import your modal

export function SignUp({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showModal, setShowModal] = useState(false)

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault() // prevent page reload
    setShowModal(true) // show modal
  }

  return (
    <div className={cn("flex flex-col justify-center items-center my-20 gap-4", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full max-w-4xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSignUp} className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex flex-col gap-6">
              {/* Logo + Title */}
              <div className="flex flex-col items-center text-center">
                <div className="logo">
                  <img className="h-30 object-contain" src="messelor_logo.png" alt="Messelor Logo" />
                </div>
                <p className="text-muted-foreground text-balance">
                  Create your Messelor account
                </p>
              </div>

              {/* Name */}
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-3">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>

              {/* Signup button */}
              <Button type="submit" className="w-full cursor-pointer">
                Sign Up
              </Button>

              {/* Divider */}
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-gray-900 relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-3 gap-4">
                {/* Keep your social login buttons here... */}
              </div>

              {/* Link to login */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>

          {/* Right image */}
          <div className="relative hidden md:flex">
            <img src="hero_page.jpg" alt="Image" className="object-cover w-full h-full" />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-gray-900 *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>

      {/* Show modal if state is true */}
      {showModal && <Role closeModal={() => setShowModal(false)}/>}
    </div>
  )
}

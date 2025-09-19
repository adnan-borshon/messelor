import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

import Role from "@/Components/Authentication/Role.tsx"

export function SignUp({ className, ...props }: React.ComponentProps<"div">) {
  const [showModal, setShowModal] = useState(false)

  // 🟢 Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()

 
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    console.log("Form Data:", formData.password) 
    console.log("Form Data:", formData.email) 
    console.log("Form Data:", formData.name) 
    setShowModal(true)
  }

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center my-20 gap-4",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0 w-full max-w-4xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSignUp}
            className="p-6 md:p-8 flex flex-col justify-center"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="logo">
                  <img
                    className="h-30 object-contain"
                    src="messelor_logo.png"
                    alt="Messelor Logo"
                  />
                </div>
                <p className="text-muted-foreground text-balance">
                  Create your Messelor account
                </p>
              </div>

              {/* Name */}
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Signup button */}
              <Button type="submit" className="w-full cursor-pointer">
                Sign Up
              </Button>
            </div>
          </form>

          <div className="relative hidden md:flex">
            <img
              src="hero_page.jpg"
              alt="Image"
              className="object-cover w-full h-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-gray-900 text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>

      {/* Show modal if state is true */}
      {showModal && <Role closeModal={() => setShowModal(false)} />}
    </div>
  )
}

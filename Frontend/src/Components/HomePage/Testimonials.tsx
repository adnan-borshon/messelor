import React from 'react'
import { Card, CardContent } from "@/Components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
function Testimonials() {
    
const testimonials = [
  {
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=1",
    feedback: "This platform is amazing! It really helped me grow my business."
  },
  {
    name: "Jane Smith",
    image: "https://i.pravatar.cc/150?img=2",
    feedback: "I love the clean UI and smooth user experience."
  },
  {
    name: "David Lee",
    image: "https://i.pravatar.cc/150?img=3",
    feedback: "Excellent support and fantastic features!"
  }
]

  return (
      <section className="py-12 bg-gray-50 flex flex-col justify-center items-center">
           <div className="flex flex-col items-center">
              <h2 className="text-3xl text-blue-500 font-bold">What out user say</h2>
              <p className="text-lg text-gray-700 mt-2">Real experience from real user</p>
            </div>
          <div className="grid gap-10 mt-7 md:grid-cols-3 mx-30">
           
      {testimonials.map((t, i) => (
        <Card key={i} className="rounded-2xl shadow-xl">
          <CardContent className="py-6 flex flex-col items-center text-center space-y-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={t.image} alt={t.name} />
              <AvatarFallback>{t.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground">{t.feedback}</p>
            <h3 className="font-semibold text-lg">{t.name}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
    </section>
  )
}

export default Testimonials
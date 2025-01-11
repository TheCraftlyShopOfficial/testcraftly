"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/ProductType";
import { HOST } from "@/lib/env";

// Define the shape of your form data
interface FormData {
  purpose: string;
  date: Date | null;
  something: string;
  cupon: string ;
}

export default function WhatsApp({ data }: { data: Product }) {
  const [formData, setFormData] = useState<FormData>({
    purpose: "",
    date: null,
    something: "",
    cupon:"",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      date: date || null,
    });
  };

  const handleSubmit = () => {
    const { purpose, date, something , cupon } = formData;

    if (!purpose || !date || !something) {
      alert("All fields are required. Please fill in all the details.");
      return;
    }

    const message = `Hello, I am interested in buying *${
      data.name
    }* product url : ${`${HOST}/product/${encodeURIComponent(
      data.name
    )}/${data._id}`}
    
    *Purpose :* ${purpose}.
    *Expect To Be Delivered :* ${date.toLocaleDateString()}.
    *Description :* ${something}
    *Cupon Code:* ${cupon}`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/9609096095` + "?text=" + encodedMessage;

    window.open(url, "_blank");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>
            Tell us what is on your mind and how we can help.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              placeholder="What's the purpose?"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  id="date"
                  placeholder="Select a date"
                  value={
                    formData.date ? formData.date.toLocaleDateString() : ""
                  }
                  className="cursor-pointer"
                  readOnly
                  required
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date || undefined}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="something">Something on Your Mind</Label>
            <Textarea
              id="something"
              placeholder="Share your thoughts..."
              className="min-h-[100px]"
              value={formData.something}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cupon">Cupon Code</Label>
            <Input
              id="cupon"
              placeholder="Do You have any Cupon Code?"
              value={formData.cupon}
              onChange={handleChange}
            
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

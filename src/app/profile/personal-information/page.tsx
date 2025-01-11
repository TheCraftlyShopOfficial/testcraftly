import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Personal() {
  return (
    <section className="flex-1 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Personal Information</h1>
        <Button variant="link">Edit</Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="firstname">First Name</Label>
          <Input id="firstname" placeholder="Animesh" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" placeholder="Kumbhakar" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Label>Your Gender</Label>
        <RadioGroup defaultValue="male" className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-lg font-semibold">Email Address</h2>
        <Button variant="link">Edit</Button>
      </div>
      <div className="mt-2 space-y-2">
        <Input value="animeshkum723126@gmail.com" readOnly />
      </div>
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-lg font-semibold">Mobile Number</h2>
        <Button variant="link">Edit</Button>
      </div>
      <div className="mt-2 space-y-2">
        <Input value="" readOnly />
      </div>
    </section>
  );
}

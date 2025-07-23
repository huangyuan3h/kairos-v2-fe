"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleClick = () => {
    alert("Clicked!");
  };

  return (
    <div>
      <div className="text-3xl font-bold underline">Hello, World!</div>
      <div>
        <Button onClick={handleClick}>Click me</Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      date: "2023-06-15",
      total: 149.99,
      status: "Delivered",
    },
    {
      id: "ORD002",
      date: "2023-05-20",
      total: 79.99,
      status: "Cancelled",
    },
    {
      id: "ORD003",
      date: "2023-04-01",
      total: 299.99,
      status: "Shipped",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const handleSearch = (e: any) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.date.toLowerCase().includes(term) ||
          order.status.toLowerCase().includes(term)
      )
    );
  };
  return (
    <>
      <div className="px-8">
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>{order.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>Total:</div>
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>Status:</div>
                    <Badge variant="destructive">{order.status}</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    View Order
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">No Orders</p>
        )}
      </div>
    </>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddAssetDialogProps {
  onAddAsset?: (asset: any) => void;
  children?: React.ReactNode;
}

export function AddAssetDialog({ onAddAsset, children }: AddAssetDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    type: "",
    market: "",
    quantity: "",
    price: "",
    currency: "USD",
  });

  const assetTypes = [
    { value: "stock", label: "Stock" },
    { value: "crypto", label: "Cryptocurrency" },
    { value: "etf", label: "ETF" },
    { value: "futures", label: "Futures" },
    { value: "bond", label: "Bond" },
    { value: "cash", label: "Cash" },
  ];

  const markets = [
    { value: "US", label: "US Market" },
    { value: "CN", label: "Chinese Market" },
    { value: "HK", label: "Hong Kong Market" },
    { value: "JP", label: "Japanese Market" },
    { value: "EU", label: "European Market" },
    { value: "GLOBAL", label: "Global" },
  ];

  const currencies = [
    { value: "USD", label: "USD" },
    { value: "CNY", label: "CNY" },
    { value: "EUR", label: "EUR" },
    { value: "JPY", label: "JPY" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAsset = {
      id: Date.now().toString(),
      ...formData,
      quantity: parseFloat(formData.quantity),
      currentPrice: parseFloat(formData.price),
      costBasis: parseFloat(formData.price) * parseFloat(formData.quantity),
      marketValue: parseFloat(formData.price) * parseFloat(formData.quantity),
      totalReturn: 0,
      totalReturnPercent: 0,
      change24h: 0,
      changePercent24h: 0,
      lastUpdated: new Date().toISOString(),
    };

    onAddAsset?.(newAsset);
    setOpen(false);
    setFormData({
      symbol: "",
      name: "",
      type: "",
      market: "",
      quantity: "",
      price: "",
      currency: "USD",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>
            Add a new asset to your portfolio. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="symbol" className="text-right">
                Symbol
              </Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) =>
                  setFormData({ ...formData, symbol: e.target.value })
                }
                className="col-span-3"
                placeholder="AAPL"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="col-span-3"
                placeholder="Apple Inc."
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="market" className="text-right">
                Market
              </Label>
              <Select
                value={formData.market}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, market: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  {markets.map((market) => (
                    <SelectItem key={market.value} value={market.value}>
                      {market.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                step="any"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="col-span-3"
                placeholder="100"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="any"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="col-span-3"
                placeholder="150.00"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                Currency
              </Label>
              <Select
                value={formData.currency}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, currency: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Asset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

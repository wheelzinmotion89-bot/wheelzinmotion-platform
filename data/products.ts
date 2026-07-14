export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  condition: "New" | "Like New" | "Refurbished" | "Used";
  description: string;
  image: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "gaming-pc-001",
    name: "Custom Gaming PC",
    category: "Desktop Computers",
    price: 1499.99,
    condition: "New",
    description:
      "High-performance gaming PC built for smooth gameplay, streaming, and everyday use.",
    image: "/images/products/gaming-pc-001.jpg",
    inStock: true,
  },
];
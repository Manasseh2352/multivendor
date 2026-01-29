import Nav from "@/components/Nav";
import Products from "@/components/Products";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  rating: number;
  totalProducts: number;
}

// Fetch vendors from API
async function getVendors(): Promise<Vendor[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/vendors`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }
}

export default async function Page() {
  const vendors = await getVendors();

  return (
    <div>
      <Nav />
      <div className="pt-24 pb-12">

        {/* Products Section */}
        <div className="container mx-auto px-8 py-12">
          <Products />
        </div>

      </div>
    </div>
  );
}
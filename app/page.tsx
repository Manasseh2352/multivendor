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

        {/* Featured Vendors Section */}
        <div id="vendors" className="bg-gray-50 py-16">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Vendors</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our trusted vendors and discover unique products from different categories
              </p>
            </div>

            {vendors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {vendors.map((vendor) => (
                  <Link key={vendor.id} href={`/${vendor.slug}`} className="group">
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{vendor.name}</h3>
                      <p className="text-gray-600 mb-4">{vendor.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">⭐ {vendor.rating}/5</span>
                        <span className="text-sm text-gray-500">{vendor.totalProducts} products</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Visit Store
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>Loading vendors...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
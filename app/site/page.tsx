import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Nav from "@/components/Nav";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  products: Product[];
  rating: number;
  totalProducts: number;
}

interface VendorPageProps {
  params: {
    vendorSlug: string;
  };
}

// Fetch vendor data from API
async function getVendor(slug: string): Promise<Vendor | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/vendors/${slug}`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: VendorPageProps): Promise<Metadata> {
  const vendor = await getVendor(params.vendorSlug);

  if (!vendor) {
    return {
      title: 'Vendor Not Found',
      description: 'The requested vendor could not be found.'
    };
  }

  return {
    title: `${vendor.name} - ${vendor.category} | MultiVendor Platform`,
    description: vendor.description,
    keywords: [vendor.category, vendor.name, 'products', 'shopping', 'online store'],
    openGraph: {
      title: `${vendor.name} - ${vendor.category}`,
      description: vendor.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${vendor.name} - ${vendor.category}`,
      description: vendor.description,
    },
  };
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { vendorSlug } = params;
  const vendor = await getVendor(vendorSlug);

  if (!vendor) {
    notFound();
  }

  return (
    <div>
      <Nav />
      <div className="container mx-auto p-8">
        {/* Vendor Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{vendor.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>⭐ {vendor.rating}/5 rating</span>
                <span>📦 {vendor.totalProducts} products</span>
                <span>🏷️ {vendor.category}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {vendor.category}
              </span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          {vendor.products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {vendor.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showVendor={false}
                  />
                ))}
              </div>

              <div className="text-center">
                <Button size="lg">
                  View All Products
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No products available from this vendor</p>
            </div>
          )}
        </div>

        {/* Vendor Info */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">About {vendor.name}</h3>
          <p className="text-gray-700 mb-4">
            {vendor.name} is a trusted {vendor.category.toLowerCase()} vendor offering high-quality products
            to customers worldwide. With {vendor.totalProducts} products in our catalog and a {vendor.rating}/5
            customer rating, we're committed to providing exceptional shopping experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{vendor.totalProducts}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{vendor.rating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{vendor.category}</div>
              <div className="text-sm text-gray-600">Category</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
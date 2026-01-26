import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Nav from "@/components/Nav";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";

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
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="pt-20 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium">{vendor.category}</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {vendor.name}
              </h1>

              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                {vendor.description}
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">⭐</span>
                  <span>{vendor.rating}/5 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-300">📦</span>
                  <span>{vendor.totalProducts} products</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">🏆</span>
                  <span>Trusted vendor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our curated collection of high-quality products
            </p>
          </div>

          {vendor.products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {vendor.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showVendor={false}
                  />
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  View All Products
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Yet</h3>
                <p className="text-gray-600 mb-6">
                  This vendor is currently updating their product catalog. Check back soon!
                </p>
                <Button variant="outline">
                  Browse Other Vendors
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Vendor Stats Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-12">Why Choose {vendor.name}?</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Top Rated</h4>
                  <p className="text-gray-600">
                    Consistently rated {vendor.rating}/5 by our customers for quality and service
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Wide Selection</h4>
                  <p className="text-gray-600">
                    {vendor.totalProducts} carefully curated products across {vendor.category.toLowerCase()}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Fast Delivery</h4>
                  <p className="text-gray-600">
                    Quick and reliable shipping on all orders from our trusted vendor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Shop?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our complete collection and find exactly what you're looking for
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Contact Vendor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
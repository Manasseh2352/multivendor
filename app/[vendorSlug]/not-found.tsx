import Nav from "@/components/Nav";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-8xl mb-8">🏪</div>

            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Vendor Not Found
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sorry, we couldn't find the vendor you're looking for.
              The vendor might not exist or may have been removed from our platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Browse All Vendors
                </Button>
              </Link>

              <Link href="/site">
                <Button size="lg" variant="outline" className="px-8">
                  View Vendor Directory
                </Button>
              </Link>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Vendors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/vendor-a" className="text-blue-600 hover:text-blue-800 font-medium">
                  TechHub Electronics
                </Link>
                <Link href="/vendor-b" className="text-blue-600 hover:text-blue-800 font-medium">
                  Fashion Forward
                </Link>
                <Link href="/vendor-c" className="text-blue-600 hover:text-blue-800 font-medium">
                  Home & Garden Co
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
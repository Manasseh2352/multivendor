import Nav from "@/components/Nav";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div>
      <Nav />
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vendor Not Found</h2>
          <p className="text-gray-600 mb-8">
            The vendor you're looking for doesn't exist or may have been removed.
          </p>
          <Link href="/">
            <Button size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
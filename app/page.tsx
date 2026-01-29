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



export default async function Page() {


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
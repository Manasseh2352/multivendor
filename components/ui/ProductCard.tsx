interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  vendorName?: string;
  showVendor?: boolean;
}

export default function ProductCard({
  product,
  vendorName,
  showVendor = true
}: ProductCardProps) {
  return (
    <div className="border-2 shadow-lg rounded-2xl p-6 bg-white hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
      <div className="flex-1">
        {showVendor && vendorName && (
          <p className="text-sm text-gray-500 mb-1">by {vendorName}</p>
        )}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</p>
      </div>
      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-[#159C47] transition-colors font-medium">
        Add to Cart
      </button>
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string
}

interface ProductCardProps {
  product: Product;
  vendorName?: string;
  vendorImg?: string;
  vendorSlug?: string;
  showVendor?: boolean;
}

export default function ProductCard({
  product,
  vendorName,
  vendorSlug,
  vendorImg,
  showVendor = true
}: ProductCardProps) {
  return (
    <div className="border-2 shadow-lg rounded-2xl p-6 bg-primary hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
      <div className="flex-1">
        {showVendor && vendorName && (
          <div className="mb-1">
            {vendorSlug ? (
              <Link
                href={`/${vendorSlug}`}
                className="text-lg flex text-blue-600 hover:text-blue-800  font-medium"
              >
                by {vendorName}
                {vendorImg && (
                  <Image 
                  src={vendorImg}
                  width={100}
                  height={100}
                  alt='vendors Image'
                  className='rounded-full h-10 w-10 object-cover '
                  />
                )}
              </Link>
            ) : (
              <p className="text-sm text-gray-500">by {vendorName}</p>
            )}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
       <div className='flex justify-center'>
         <Image 
                src={product.img}
                width={100}
                height={100}
                alt='vendors Image'
                className=' object-cover '
                />
       </div>
        <p className="text-2xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</p>
      </div>
      <button className="w-full bg-[#159C47] text-white py-3 px-4 rounded-lg hover:bg-black hover:text-white transition-colors font-medium">
        Add to Cart
      </button>
    </div>
  );
}
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../utils';
export default function BestDeals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/rewear-products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching ReWear products:", err);
        setProducts([]);
      });
  }, []);

  return (
    <div>

      {/* Heading */}
      <div className="flex justify-between items-center m-5 md:m-10">

        <div>
          <h2 className="raleway md:pt-5 text-xl font-bold md:text-4xl text-black">
            PRE-LOVED FASHION
          </h2>

          <p className="text-gray-500 text-sm md:text-base mt-1">
            Quality clothing at great prices
          </p>
        </div>

        <Link
          to="/all-products"
          className="raleway flex items-center gap-1 text-blue-600 hover:underline underline-offset-8 md:text-xl"
        >
          Browse all clothes
          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Desktop */}
      <div className="hidden md:block m-10 border border-gray-300 rounded-xl p-5">

        {products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No clothing listings available yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {products.slice(0, 8).map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="block"
              >

                <div className="h-full p-4 rounded-md shadow-lg border border-gray-300 hover:shadow-xl transition flex flex-col justify-between bg-white">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />

                  <h2 className="raleway text-lg font-bold">
                    {product.title}
                  </h2>

                  <p className="raleway text-sm text-gray-600 line-clamp-2 flex-grow mt-1">
                    {product.description}
                  </p>

                  <p className="text-xl text-green-600 font-semibold pt-2">
                    ₹ {product.price}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      Size: {product.size}
                    </span>

                    <span className="text-xs font-semibold text-purple-600">
                      {product.listingType === "SWAP"
                        ? "Swap"
                        : "For Sale"}
                    </span>
                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>

      {/* Mobile */}
      <div className="block sm:hidden p-2">

        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No clothing listings available yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">

            {products.slice(0, 6).map((product) => (
              <Link
                to={`/api/product/${product._id}`}
                key={product._id}
              >

                <div className="shadow-lg rounded-md overflow-hidden bg-white border border-gray-200">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover"
                  />

                  <p className="font-semibold text-center px-2 pt-2">
                    {product.title}
                  </p>

                  <p className="text-green-600 font-semibold text-center py-2">
                    ₹ {product.price}
                  </p>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}
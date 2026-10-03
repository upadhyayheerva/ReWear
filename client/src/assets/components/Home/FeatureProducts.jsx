import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FeatureProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/rewear-products")
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
    <section className="w-full py-8 px-4 md:px-10">

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="raleway text-xl md:text-4xl font-semibold">
            Featured Clothing
          </h2>

          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Discover recently listed pre-loved fashion.
          </p>
        </div>

        <Link
          to="/all-products"
          className="raleway flex items-center gap-1 text-purple-600 hover:text-purple-800 hover:underline underline-offset-8"
        >
          Browse all
          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-xl">
          <p className="text-gray-500">
            No featured clothing available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {products.slice(0, 8).map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
            >
              <div className="p-3 md:p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition bg-white h-full">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 md:h-52 object-cover rounded-lg mb-3"
                />

                <h3 className="font-semibold text-gray-800 text-sm md:text-lg line-clamp-1">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-3">

                  <p className="text-lg text-green-600 font-bold">
                    ₹ {product.price}
                  </p>

                  <span className="text-xs font-semibold text-purple-600">
                    {product.listingType === "SWAP"
                      ? "SWAP"
                      : "SALE"}
                  </span>

                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {product.category} • Size {product.size}
                </p>

              </div>
            </Link>
          ))}

        </div>
      )}

    </section>
  );
}
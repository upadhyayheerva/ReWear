import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:3000/api/rewear-products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ReWear products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const searchQuery = (params.get("search") || "").toLowerCase().trim();
    const category = (params.get("category") || "").toLowerCase().trim();

    const filtered = products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.title?.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery) ||
        product.brand?.toLowerCase().includes(searchQuery) ||
        product.category?.toLowerCase().includes(searchQuery);

      const matchesCategory =
        !category ||
        product.category?.toLowerCase() === category;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [products, location.search]);

  const clearFilters = () => {
    navigate("/all-products");
  };

  return (
    <>
      <Header />

      <div className="px-4 py-2 md:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-600 font-semibold hover:underline"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>
      </div>

      <div className="bg-gray-200 w-full h-[1px]" />

      <section className="w-full px-4 md:px-10 py-8">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              ReWear Clothing Collection
            </h2>

            <p className="text-gray-500 text-sm md:text-lg mt-1">
              Discover pre-loved fashion and give clothes a second life.
            </p>
          </div>

          <div className="flex items-center gap-2 text-purple-600">
            <SlidersHorizontal size={20} />
            <span className="font-semibold">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Active Filters */}
        {(new URLSearchParams(location.search).get("search") ||
          new URLSearchParams(location.search).get("category")) && (
          <div className="mb-6 flex flex-wrap items-center gap-3">

            <span className="text-sm text-gray-500">
              Showing results for:
            </span>

            {new URLSearchParams(location.search).get("search") && (
              <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                <Search size={14} />
                {new URLSearchParams(location.search).get("search")}
              </span>
            )}

            {new URLSearchParams(location.search).get("category") && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {new URLSearchParams(location.search).get("category")}
              </span>
            )}

            <button
              onClick={clearFilters}
              className="text-sm text-red-500 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 mt-4">
              Loading clothing...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (

          /* No Results */
          <div className="text-center py-20 border border-gray-200 rounded-2xl bg-gray-50">
            <div className="text-5xl mb-4">
              👕
            </div>

            <h3 className="text-xl font-semibold text-gray-700">
              No clothing found
            </h3>

            <p className="text-gray-500 mt-2">
              Try a different search or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700"
            >
              View All Clothes
            </button>
          </div>

        ) : (

          /* Products */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 pb-10">

            {filteredProducts.map((product) => (

              <Link
                key={product._id}
                to={`/product/${product._id}`}
              >
                <div className="bg-white p-2 md:p-4 rounded-xl shadow hover:shadow-xl border border-gray-200 transition-all duration-300 h-full flex flex-col">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-32 md:h-48 object-contain mb-3 rounded-lg"
                  />

                  <div className="flex flex-col flex-grow">

                    <p className="text-sm md:text-xl text-gray-800 font-semibold line-clamp-1">
                      {product.title}
                    </p>

                    <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <p className="text-green-600 font-bold text-base md:text-xl mt-3">
                      ₹ {product.price}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {product.size} • {product.condition}
                      </span>

                      <span className="text-xs font-semibold text-purple-600">
                        {product.listingType === "SWAP"
                          ? "SWAP"
                          : "SALE"}
                      </span>
                    </div>

                    {product.brand && (
                      <p className="text-xs text-gray-400 mt-2">
                        Brand: {product.brand}
                      </p>
                    )}

                  </div>
                </div>
              </Link>

            ))}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
}
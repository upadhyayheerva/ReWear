import { useState } from "react";
import Header from "../assets/components/Home/Header";
import Footer from "../assets/components/Home/Footer";

export default function ProductListing() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    size: "",
    condition: "",
    brand: "",
    listingType: "SELL",
    seller: {
      name: "",
      location: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("seller.")) {
      const key = name.split(".")[1];

      setProduct((prev) => ({
        ...prev,
        seller: {
          ...prev.seller,
          [key]: value,
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/rewear-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            price: Number(product.price),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit clothing");
      }

      const data = await response.json();

      console.log("Clothing saved:", data);

      alert("✅ Clothing listed successfully!");

      setProduct({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        size: "",
        condition: "",
        brand: "",
        listingType: "SELL",
        seller: {
          name: "",
          location: "",
        },
      });
    } catch (error) {
      console.error("Error submitting clothing:", error);
      alert("❌ Failed to list clothing");
    }
  };

  return (
    <>
      <Header showSearchBar={false} />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Sell or Swap Your Clothes
            </h1>

            <p className="text-gray-500 mt-2">
              Give your pre-loved clothing a new home.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Clothing Title
              </label>

              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Classic Denim Jacket"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Describe the clothing item, its condition and how it has been used."
                rows="4"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="899"
                min="0"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Clothing Image URL
              </label>

              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                required
              />

              <p className="text-xs text-gray-500 mt-2">
                Add a clear image URL of the clothing item.
              </p>
            </div>

            {/* Category + Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 outline-none bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Size
                </label>

                <select
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 outline-none bg-white"
                  required
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="Free Size">Free Size</option>
                </select>
              </div>

            </div>

            {/* Condition + Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Condition
                </label>

                <select
                  name="condition"
                  value={product.condition}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 outline-none bg-white"
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Levi's"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                />
              </div>

            </div>

            {/* Listing Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Listing Type
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <label
                  className={`border rounded-xl p-4 cursor-pointer ${
                    product.listingType === "SELL"
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="listingType"
                    value="SELL"
                    checked={product.listingType === "SELL"}
                    onChange={handleChange}
                    className="mr-2"
                  />

                  <span className="font-semibold">
                    Sell
                  </span>

                  <p className="text-sm text-gray-500 mt-1 ml-5">
                    Sell this clothing item for money.
                  </p>
                </label>

                <label
                  className={`border rounded-xl p-4 cursor-pointer ${
                    product.listingType === "SWAP"
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="listingType"
                    value="SWAP"
                    checked={product.listingType === "SWAP"}
                    onChange={handleChange}
                    className="mr-2"
                  />

                  <span className="font-semibold">
                    Swap
                  </span>

                  <p className="text-sm text-gray-500 mt-1 ml-5">
                    Exchange this clothing with another user.
                  </p>
                </label>

              </div>
            </div>

            {/* Seller Information */}
            <div className="border-t pt-6">

              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Seller Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Seller Name
                  </label>

                  <input
                    type="text"
                    name="seller.name"
                    value={product.seller.name}
                    onChange={handleChange}
                    placeholder="Aarav Shah"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    name="seller.location"
                    value={product.seller.location}
                    onChange={handleChange}
                    placeholder="Rajkot"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition"
            >
              List Clothing
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
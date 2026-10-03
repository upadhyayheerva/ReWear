import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar({
  searchText = "",
  onChange,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/rewear-products")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Set(
            data
              .map((product) => product.category)
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Error fetching ReWear categories:", err);
        setCategories([]);
      });
  }, []);

  const handleSearch = () => {
    const query = searchText.trim();

    if (!query && !selectedCategory) {
      navigate("/all-products");
      return;
    }

    const params = new URLSearchParams();

    if (query) {
      params.set("search", query);
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    navigate(`/all-products?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center h-12 w-full bg-white border border-gray-300 px-3 py-2 rounded-full shadow-sm overflow-hidden my-2 md:ml-20">

      {/* Category */}
      <select
        className="text-sm bg-transparent pr-2 focus:outline-none whitespace-nowrap text-gray-700"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Category</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search clothes..."
        value={searchText}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="truncate flex-grow min-w-0 py-1 text-gray-700 bg-transparent focus:outline-none"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        type="button"
        className="text-purple-600 hover:text-purple-800 flex-shrink-0 ml-2"
        title="Search"
      >
        <Search size={22} />
      </button>
    </div>
  );
}
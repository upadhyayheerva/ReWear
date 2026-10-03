import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
  },
  {
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
  },
  {
    name: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=500",
  },
];

export default function CategorySection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative md:m-10 pb-10">

      <div className="raleway font-bold text-xl md:text-4xl text-black flex justify-center my-6">
        Shop by Category
      </div>

      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 shadow-md rounded-full p-2 z-10 hover:bg-purple-700"
        onClick={() => scroll("left")}
      >
        <ArrowLeft color="white" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 shadow-md rounded-full p-2 z-10 hover:bg-purple-700"
        onClick={() => scroll("right")}
      >
        <ArrowRight color="white" />
      </button>

      <div className="flex justify-center">
        <div
          ref={scrollRef}
          className="overflow-x-auto flex snap-x snap-mandatory space-x-4 px-4 scrollbar-hide"
        >
          {categories.map((item) => (
            <Link
              key={item.name}
              to="/all-products"
              className="w-32 h-40 md:w-56 md:h-52 border border-gray-300 rounded-md snap-center raleway text-lg font-medium shrink-0 text-center flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-200 bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-28 md:h-32 md:w-36 mb-2 object-cover rounded-lg"
              />

              <p className="mt-2 md:text-xl font-semibold">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
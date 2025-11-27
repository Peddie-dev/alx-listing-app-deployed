import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/ui/PropertyCard";
import { HERO_BG } from "@/constants";
import { PropertyProps } from "@/interfaces";

export default function Home() {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("");
  
  // Filters should match the categories you have in your sample data
  const filters = ["Luxury Villa", "Pool", "Free Parking", "Mountain View", "Fireplace", "Self Checkin", "Desert View", "Pet Friendly"];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="h-[500px] flex flex-col justify-center items-center text-center text-white bg-cover bg-center relative"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold mb-4">
            Find your favorite place here!
          </h1>
          <p className="text-lg max-w-xl">
            The best prices for over 2 million properties worldwide.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="my-8 max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedFilter(selectedFilter === filter ? "" : filter)
            }
            className={`px-4 py-2 rounded-full border transition ${
              selectedFilter === filter
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Property Listing */}
      <main className="max-w-7xl mx-auto px-4 pb-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {properties
          .filter((property) =>
            selectedFilter
              ? property.category.some((cat) => cat.includes(selectedFilter))
              : true
          )
          .map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </main>
    </>
  );
}

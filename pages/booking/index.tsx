import { useState } from "react";
import axios from "axios";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!formData.firstName || !formData.email || !formData.cardNumber) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/bookings", formData);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">Booking Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields */}
        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" },
          { label: "Card Number", name: "cardNumber", type: "text" },
          { label: "Expiration Date", name: "expirationDate", type: "text" },
          { label: "CVV", name: "cvv", type: "password" },
          { label: "Billing Address", name: "billingAddress", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mt-2">
            ✅ Booking confirmed successfully!
          </p>
        )}
      </form>
    </div>
  );
}

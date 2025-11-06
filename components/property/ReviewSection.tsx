import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: string | number;
  user: string;
  rating: number;
  comment: string;
  date?: string;
}

interface ReviewSectionProps {
  propertyId: string | number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;

      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p className="text-gray-500 text-center py-4">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center py-4">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-gray-400 text-center py-4">No reviews yet.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-800">{review.user}</span>
              <span className="text-yellow-500 text-sm">⭐ {review.rating}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            {review.date && (
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;

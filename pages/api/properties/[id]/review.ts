import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Example: Mock reviews for testing
  const mockReviews = {
    "1": [
      {
        id: 1,
        user: "Jane Doe",
        rating: 5,
        comment: "Amazing place! Very clean and cozy.",
        date: "2025-10-10",
      },
      {
        id: 2,
        user: "John Smith",
        rating: 4,
        comment: "Great location and friendly staff.",
        date: "2025-09-22",
      },
    ],
    "2": [
      {
        id: 3,
        user: "Alice Johnson",
        rating: 5,
        comment: "Absolutely loved it! Will come back again.",
        date: "2025-08-15",
      },
    ],
  };

  // Default empty list if property ID not found
  const reviews = mockReviews[id as string] || [];

  if (req.method === "GET") {
    res.status(200).json(reviews);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

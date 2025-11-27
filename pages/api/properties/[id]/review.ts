import { NextApiRequest, NextApiResponse } from "next";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Record<string, Review[]> = {
  "1": [
    { id: 1, user: "Jane Doe", rating: 5, comment: "Amazing place! Very clean and cozy.", date: "2025-10-10" },
    { id: 2, user: "John Smith", rating: 4, comment: "Great location and friendly staff.", date: "2025-09-22" },
  ],
  "2": [
    { id: 3, user: "Alice Johnson", rating: 5, comment: "Absolutely loved it! Will come back again.", date: "2025-08-15" },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Ensure idStr is a string
  const idStr = Array.isArray(id) ? id[0] : id;

  // If idStr is undefined, return empty array
  const reviews = idStr ? mockReviews[idStr] || [] : [];

  if (req.method === "GET") {
    res.status(200).json(reviews);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

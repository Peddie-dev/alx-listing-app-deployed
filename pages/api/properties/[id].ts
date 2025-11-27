// pages/api/properties/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
//import ReviewSection from "@/components/property/ReviewSection";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Convert id to number if needed
  const propertyId = Number(id);

  // For now, just use the index as id (since PROPERTYLISTINGSAMPLE doesn’t have real ids)
  const property = PROPERTYLISTINGSAMPLE[propertyId - 1];

  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  return res.status(200).json(property);
}

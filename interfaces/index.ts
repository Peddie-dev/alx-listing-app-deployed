// interfaces/index.ts
export interface AddressProps {
  state: string;
  city: string;
  country: string;
}

export interface OffersProps {
  bed: string;
  shower: string;
  occupants: string;
}

export interface PropertyProps {
  id: number; // ✅ Added for key usage
  name: string;
  address: AddressProps;
  rating: number;
  category: string[];
  price: number;
  offers: OffersProps;
  image: string;
  discount: string;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary";
}

export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price?: string | number;    // optional
  location?: string;          // optional
  onClick?: () => void;       // optional
}




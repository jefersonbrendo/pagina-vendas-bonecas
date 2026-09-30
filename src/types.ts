export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  avatar: string;
  rating: number;
  daughterAge: string;
  quote: string;
  tag?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: 'geral' | 'impressao' | 'acesso';
}

export interface PricingPlan {
  id: 'basic' | 'premium' | 'alegria_special';
  name: string;
  popular?: boolean;
  originalPrice: number;
  price: number;
  discountPercentage: number;
  features: string[];
  exclusiveBonuses?: string[];
  ctaText: string;
  highlightText?: string;
  checkoutUrl?: string;
}

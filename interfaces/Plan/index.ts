export interface Plan {
  title: string;
  description: string;
  credits: number;
  original_price: number;
  new_price: number;
  is_popular: boolean;
  benefits: string[];
  credit_actions: string[];
}
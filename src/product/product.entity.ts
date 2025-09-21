export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  availableQuantity: number;
  description: string;
  characteristics: { name: string; description: string }[];
  images: { url: string; description: string }[];
  category: string;
}

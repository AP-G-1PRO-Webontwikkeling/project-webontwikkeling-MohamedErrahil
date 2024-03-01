export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    isAutomatic: boolean;
    manufacturingDate: string;
    imageUrl: string;
    fuelType: string;
    features: string[];
    owner: {
      id: number;
      name: string;
      age: number;
      image: string;
    };
  }
export interface Vehicle {
    id: number;
    licensePlate: string;
    vehicleType: string;
    entryTime: string;
    exitTime: string;
    assignedSpot: { spotId: string };
  }
  
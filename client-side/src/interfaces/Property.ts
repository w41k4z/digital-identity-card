export default interface Property {
  ID: string;
  personNationalIdentityCard: string;
  acquisitionDate: Date;
  description: string;
  polygon: {
    longitude: number;
    latitude: number;
  }[];
}

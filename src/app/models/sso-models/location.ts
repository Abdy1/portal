import { Shared } from "./shared";

export interface Location {
  id: number;
  code: string;
  name: string;
  locationGroup: Shared;
}
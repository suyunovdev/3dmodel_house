export function isValidArea(area: number): boolean {
  return area >= 20 && area <= 2000
}

export function isValidFloors(floors: number): boolean {
  return Number.isInteger(floors) && floors >= 1 && floors <= 5
}

export function isValidBedrooms(bedrooms: number): boolean {
  return Number.isInteger(bedrooms) && bedrooms >= 1 && bedrooms <= 10
}

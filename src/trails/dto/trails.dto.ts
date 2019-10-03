export class TrailDto {
  id: string;
  createAt: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude: string;
  longitude: string;
}

export class TrailCreateDto {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude: string;
  longitude: string;
}

export class TrailUpdateDto {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude: string;
  longitude: string;
}

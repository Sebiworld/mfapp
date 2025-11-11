export interface PerformanceDto {
  id: number;
  title?: string;
  location_id?: number;
  timestamp: number;
  timestamp_until?: number;
  seasons?: SeasonDto[];
  casts?: CastDto[];
  categories?: CategoryDto[];
  ticket_url?: string;
}

export interface SeasonDto {
  id: number;
  title: string;
  url?: string;
}

export interface CastDto {
  id: number;
  title: string;
  url?: string;
}

export interface CategoryDto {
  id: number;
  title: string;
  url?: string;
}

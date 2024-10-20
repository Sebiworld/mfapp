export interface PerformanceDto {
  id: number;
  timestamp: number;
  seasons?: SeasonDto[];
  casts?: CastDto[];
  categories?: CategoryDto[];
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

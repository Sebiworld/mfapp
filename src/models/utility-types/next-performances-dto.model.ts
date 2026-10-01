import { CastDto } from "./performance-dto.model";

/** One performance as listed by `GET /performances/next`. */
export interface NextPerformanceItemDto {
  id: number;
  title: string;
  /** Start in seconds. */
  timestamp: number;
  timestamp_until: number | null;
  admission_minutes: number | null;
  ticket_url: string | null;
  event: { id: number; title: string };
  project: { id: number; title: string; url: string };
  casts: CastDto[];
}

/**
 * Response of `GET /performances/next`. `current` runs from the start of admission until the end,
 * `next` is the earliest later performance that is not `current`.
 */
export interface NextPerformancesDto {
  current: NextPerformanceItemDto | null;
  next: NextPerformanceItemDto | null;
  hash: string;
}

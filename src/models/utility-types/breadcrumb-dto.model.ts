export interface BreadcrumbDto {
  id: number;
  title: string;
  url?: string;
  httpUrl?: string;
  active?: boolean;
  viewable?: boolean;
}

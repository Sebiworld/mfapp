import { TemplateDto } from '@models/template-dto.model';

export interface PageDto {
  id: number;
  name: string;
  language: string;
  url: string;
  urls?: { [key: string]: string };
  httpUrl: string;
  template: TemplateDto;
  created: number;
  modified: number;
  title: string;
  hash?: string;
}

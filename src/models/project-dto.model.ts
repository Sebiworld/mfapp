export interface ProjectDto {
  id: number;
  name: string;
  title: string;
  created: number;
  modified: number;
  url: string;
  httpUrl: string;
  theme?: { [key: string]: unknown };
}

export interface Project extends ProjectDto {
  projectStyles?: { [key: string]: unknown };
}
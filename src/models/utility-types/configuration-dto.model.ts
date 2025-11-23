export type ConfigurationDto = {
  [key: string]: unknown;
  disable_login?: boolean;
  disable_registration?: boolean;
  hash?: string;
};

export interface ErrorResponseDto {
  errorcode: string;
  error: string;
  devmessage?: {
    class?: string,
    code: number,
    message?: string,
    location?: string,
    line?: number
  }
}
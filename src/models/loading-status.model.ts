export interface LoadingStatusBase<T> {
  data?: T;
}
export interface LoadingStatusUninitialized<T> extends LoadingStatusBase<T> {
  status: 'uninitialized';
}
export interface LoadingStatusLoading<T> extends LoadingStatusBase<T> {
  status: 'loading';
}
export interface LoadingStatusSuccess<T> extends LoadingStatusBase<T> {
  status: 'success';
}
export interface LoadingStatusError<T> extends LoadingStatusBase<T> {
  status: 'error';
  name: string;
  code?: string;
  statusCode?: number;
  message?: string;
  stack?: string;
}

export type LoadingStatus<T> = LoadingStatusUninitialized<T> | LoadingStatusLoading<T> | LoadingStatusSuccess<T> | LoadingStatusError<T>;

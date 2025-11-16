/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

/**
 * API error types
 */
export type ApiErrorType =
  | "NOT_FOUND"
  | "RATE_LIMIT"
  | "AUTH_FAILED"
  | "UNKNOWN";

/**
 * Standardized API error
 */
export interface ApiError {
  type: ApiErrorType;
  message: string;
  statusCode?: number;
  context?: Record<string, unknown>;
}

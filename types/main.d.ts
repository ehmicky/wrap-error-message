type NormalizeError<ErrorArg> = ErrorArg extends Error ? ErrorArg : Error

/**
 *
 * @example
 * ```js
 * ```
 */
export default function wrapErrorMessage<ErrorArg>(
  error: ErrorArg,
  newMessage: string,
): NormalizeError<ErrorArg>

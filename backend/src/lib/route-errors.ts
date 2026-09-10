export function statusFor(error: unknown) {
  if (error instanceof Error && error.name === "UnauthorizedError") return 401;
  if (error instanceof Error && error.name === "ConflictError") return 409;
  if (isMysqlCode(error, "ER_DUP_ENTRY")) return 409;
  if (isMysqlCode(error, "ER_ROW_IS_REFERENCED_2") || isMysqlCode(error, "ER_NO_REFERENCED_ROW_2")) {
    return 409;
  }
  return 400;
}

export function conflict(message: string): never {
  const error = new Error(message);
  error.name = "ConflictError";
  throw error;
}

function isMysqlCode(error: unknown, code: string) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === code;
}

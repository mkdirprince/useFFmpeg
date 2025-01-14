export const errorHandler = (error: unknown, context: string): never => {
  let errorMessage = `${context}: `;
  if (error instanceof Error) {
    errorMessage += error.message;
  } else {
    errorMessage += "Unknown error occurred.";
  }
  throw new Error(errorMessage);
};

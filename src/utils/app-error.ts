class AppError extends Error {
  public status: number;

  constructor({
    message,
    status = 500,
  }: {
    message?: string;
    status?: number;
  } = {}) {
    super(message);
    this.status = status;
  }
}

export default AppError;

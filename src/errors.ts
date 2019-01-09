export enum errors {
  // 5XX
  server = "500 Server",
  internal = "internal errors",

  // 4XX
  goCardlessValidationError = "go cardless validation error",
  goCardlessApiError = "invalid api usage"
}

export class GoCardlessError extends Error {
  type: errors;
  data: any;
  constructor(type: errors, data: any = {}) {
    super(JSON.stringify({ message: type, data: data }));
    this.type = type;
    this.data = data;
    Object.setPrototypeOf(this, GoCardlessError.prototype);
  }
  static isGoCardlessError(err: any): err is GoCardlessError {
    return err instanceof GoCardlessError;
  }
  toJSON() {
    return { type: this.type, data: this.data };
  }
}

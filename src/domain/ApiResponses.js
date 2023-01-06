export class ApiResponse {
  constructor({ message = null, rawValue = null, success = true }) {
    this.message = message;
    this.rawValue = rawValue;
    this.success = success;
  }
}

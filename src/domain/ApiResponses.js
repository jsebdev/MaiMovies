export class ApiResponse {
  constructor({ message = null, value = null, success = true }) {
    this.message = message;
    this.value = value;
    this.success = success;
  }
}

import CustomAPIError from './custom-api.js';

class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;

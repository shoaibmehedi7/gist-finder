import ErrorCodes from './ErrorCodes';

export default class ErrorMessages {
  static getMessage(errorCode: number) {
    switch (errorCode) {
      case ErrorCodes.USER_NOT_FOUND:
        return 'No User is found with this information';
      default:
        return 'Some Error Occurred';
    }
  }
}

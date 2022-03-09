export class UseCaseResp {
  static success<T>(data: T) {
    return {
      success: true,
      code: 0,
      data,
      message: '',
    };
  }

  static failure(message: any = '', code = -1) {
    return {
      code,
      success: false,
      data: null,
      message,
    };
  }
}

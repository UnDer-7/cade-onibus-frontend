import { AxiosResponse } from 'axios';

import ServerErrorMessages from '../utils/ServerErrorMessages';
import Interceptor from './Interceptor';

export default class InterceptorRejectResponse extends Interceptor {
  private static instance: InterceptorRejectResponse;

  private constructor() {
    super();
  }

  public static getInstance(): InterceptorRejectResponse {
    if (!this.instance) {
      InterceptorRejectResponse.instance = new InterceptorRejectResponse();
    }

    return this.instance;
  }

  public userAlreadyExists(response: AxiosResponse<string>): void {
    if (response.status === 400 && response.data === ServerErrorMessages.RESOURCE_EXISTS) {
      Interceptor.showToast(true);
      Interceptor.setMessage('Usuário já cadastrado');
    }
  }

  public userNotFound(response: AxiosResponse<string>): void {
    if (response.status === 404 && response.data === ServerErrorMessages.NOT_FOUND) {
      Interceptor.showToast(true);
      Interceptor.setMessage('Usuário não encontrado');
    }
  }

  public invalidCredentials(response: AxiosResponse<string>): void {
    if (response.status === 400 && response.data === ServerErrorMessages.INVALID_CREDENTIALS) {
      Interceptor.showToast(true);
      Interceptor.setMessage('Credenciais inválidas');
    }
  }

  public internalServerError(response: AxiosResponse<string>): void {
    if (response.status === 500) {
      Interceptor.showToast(true);
      Interceptor.setMessage('Algo deu errado');
    }
  }
}

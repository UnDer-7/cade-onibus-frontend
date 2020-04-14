import HttpClient from '../config/HttpClient';

export default abstract class AbstractResource {
  protected readonly HTTP: HttpClient;

  protected readonly BASE_URL: string;

  protected constructor(resource: string) {
    this.HTTP = HttpClient.getInstance();
    this.BASE_URL = this.HTTP.getResourceURL(resource);
  }
}

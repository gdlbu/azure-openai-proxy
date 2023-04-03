import { HttpService } from '@nestjs/axios';
import { Header, Injectable } from '@nestjs/common';
import { models } from './models';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  @Header('Content-Type', 'application/json')
  getModels() {
    return models;
  }

  getHello(): string {
    return 'Hello World! 1.4';
  }

  async getCompletions(
    endpoint: string,
    deployment_id: string,
    azureApiKey: string,
    body: any,
    stream: boolean,
  ) {
    let url = `${endpoint}/openai/deployments/${deployment_id}/chat/completions?api-version=2023-03-15-preview`;
    let headers = {
      'api-key': azureApiKey,
      'Content-Type': 'application/json',
    };
    const config = { headers: headers };
    if (stream) {
      config['responseType'] = 'stream';
    }
    let ret = this.httpService.post(url, body, config);
    return await firstValueFrom(ret);
  }
}

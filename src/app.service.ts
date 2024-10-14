import { Injectable } from '@nestjs/common';
import * as packageJson from '../package.json';

@Injectable()
export class AppService {
  getHealthCheck(): { status: string } {
    return { status: 'OK' };
  }

  getApiInfo(): { version: string; name: string } {
    return {
      version: packageJson.version,
      name: packageJson.name,
    };
  }
}

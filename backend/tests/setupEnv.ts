import * as dotenv from 'dotenv';
import { join } from 'path';

if (process.env.NODE_ENV === 'test') {
  const envFile = join(process.cwd(), '.env.test');
  dotenv.config({ path: envFile });
}

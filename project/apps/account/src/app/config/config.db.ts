import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';
import { validateConfig } from './config.utils';

class DbConfig {
  @IsString()
  @IsNotEmpty({ message: 'MONGO_URL is required' })
  public mongoUrl: string;
}

function getConfig() {
  return validateConfig(
    DbConfig,
    {
      mongoUrl: process.env.MONGO_URL || '',
    },
  );
}

export const dbConfig = registerAs('db', getConfig);

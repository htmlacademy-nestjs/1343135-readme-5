import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { validateConfig } from './config.utils';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

class ApplicationConfig {
  @IsNumber()
  @Type(() => Number)
  public port: number;

  @IsString()
  @IsIn(ENVIRONMENTS)
  public env: typeof ENVIRONMENTS[number];
}

function getConfig() {
  return validateConfig(
    ApplicationConfig,
    {
      port: Number(process.env.PORT || DEFAULT_PORT),
      env: process.env.NODE_ENV || ENVIRONMENTS[0],
    }
  );
}

export const applicationConfig =  registerAs('application', getConfig);

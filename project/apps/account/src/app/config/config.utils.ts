import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function validateConfig<T extends object>(
  dto: ClassConstructor<T>,
  source: object,
): Promise<T> {
  const config = plainToInstance(
    dto,
    source,
  );

  const errors = await validate(config);

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return config;
}

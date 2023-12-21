import { ClassTransformOptions, plainToInstance } from "class-transformer";

export function fillDto<T, P extends object>(
  dto: new () => T,
  plain: P,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, P extends object[]>(
  dto: new () => T,
  plain: P,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, P extends object>(
  dto: new () => T,
  plain: P,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(dto, plain, {
    excludeExtraneousValues: true,
    ...options,
  })
}

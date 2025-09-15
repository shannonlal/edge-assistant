import type { MockedFunction } from 'vitest';

type AnyFunction = (...args: unknown[]) => unknown;

declare global {
  const vi: {
    fn: <T extends AnyFunction>(implementation?: T) => MockedFunction<T>;
    mock: (moduleName: string, factory: () => unknown) => void;
    spyOn: <T, K extends keyof T>(
      object: T,
      method: K
    ) => MockedFunction<T[K] extends AnyFunction ? T[K] : never>;
    clearAllMocks: () => void;
  };
}

export {};

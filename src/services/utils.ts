export function normalizeKey(key: string): string {
  return key.trim().toLowerCase();
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  controller: AbortController | undefined
): Promise<T> {
  if (timeoutMs <= 0) {
    return promise;
  }

  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const t = setTimeout(() => {
        if (controller) {
          controller.abort();
        }
      });
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((result: T) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error: any) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

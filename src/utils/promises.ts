/**
 * Will stall promise for a specific time
 *
 * @param ms Number of miliseconds
 */
export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Will race a promise with a timeout.
 * From: https://playfulprogramming.com/posts/nextjs-promise-race
 *
 * @param promise Promise to race
 * @param timeout Timeout in milliseconds
 * @returns Promise that will resolve with the result of the promise or reject with the timeout
 */
export const race = (promise: Promise<unknown>, timeout: number = 1000) => {
  return Promise.any([
    promise,
    new Promise<void>((resolve) => setTimeout(() => resolve(), timeout)),
  ]);
};

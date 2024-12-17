/**
 * Will stall promise for a specific time
 * @param ms Number of miliseconds
 */
export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

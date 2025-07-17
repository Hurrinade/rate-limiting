import { resetLimitStorage } from "../middlewares/serverDefinedLimit";

/**
 * Server clock is used to reset the limit storage every 15 seconds
 * This is used to prevent the limit storage from growing indefinitely
 * and to ensure that the limit is reset after the time window has passed
 */

let startTime = Date.now();
let intervalId: NodeJS.Timeout;

export function startServerClock() {
  intervalId = setInterval(() => {
    startTime = Date.now();
    resetLimitStorage();
  }, Number(process.env.TIME_WINDOW));
}

export function getRemainingTime() {
  return Math.ceil(
    (startTime + Number(process.env.TIME_WINDOW) - Date.now()) / 1000
  );
}

export function stopServerClock() {
  clearInterval(intervalId);
}

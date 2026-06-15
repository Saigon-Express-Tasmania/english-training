export const LISTENING_UNLOCK_PIN = "13112022";

export function isUnlockPinValid(pin: string): boolean {
  return pin.trim() === LISTENING_UNLOCK_PIN;
}

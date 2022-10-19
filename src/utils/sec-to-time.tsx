import { zeroLeft } from "./zero-left";

export function secToTime(seconds: number): string {
  const hou = zeroLeft(seconds / 3600);
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${hou}h ${min}m ${sec}s`;
}

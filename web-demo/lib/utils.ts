import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSimpleHash(
  txHash: string,
  frontChars: number = 6,
  endChars: number = 4
): string {
  try {
    return `${txHash.slice(0, frontChars)}...${txHash.slice(-1 * endChars)}`;
  } catch (error) {
    return '!Invalid Hash';
  }
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function snakeToText(str: string) {
    return str.replace('_', ' ');
}

export const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then((res) => res.json());

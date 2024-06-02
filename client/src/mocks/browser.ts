import { setupWorker } from 'msw/browser';

export const handlers = [];
export const worker = setupWorker(...handlers);
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll } from "vitest";

export function createServer(handlerConfig: any) {
  const handlers = handlerConfig.map(() => {});
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}

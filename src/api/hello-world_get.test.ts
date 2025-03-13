import type { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';
import { handler } from './hello-world_get';

test('Returns expected object', async () => {
  const mockEvent = { hello: 'world' };
  const response = await handler(
    mockEvent as unknown as APIGatewayProxyEvent,
    {} as unknown as Context,
    {} as unknown as Callback,
  );

  expect(response).toEqual({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lambdaFile: 'hello-world_get.ts',
      eventData: { hello: 'world' },
    }),
    statusCode: 200,
  });
});

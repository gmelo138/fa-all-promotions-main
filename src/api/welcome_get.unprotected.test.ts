import type { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';
import { handler } from './welcome_get.unprotected';

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
      lambdaFile: 'welcome_get.unprotected.ts',
      eventData: { hello: 'world' },
    }),
    statusCode: 200,
  });
});

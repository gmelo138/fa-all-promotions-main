// The following example is a simple lambda that will be deployed as a private (REST) API.
// More details here: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html

import type {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) =>
  ({
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lambdaFile: 'hello-world_get.ts',
      eventData: event,
    }),
  }) as APIGatewayProxyResult;

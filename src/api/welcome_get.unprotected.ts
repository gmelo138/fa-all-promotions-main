// The following example is a simple lambda that will be deployed as a publicly-accessible (REST) API.
// More details here: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html
// The '.unprotected.ts' extension makes the API public.

// Note: when using '*.unprotected.ts' files with serverless, make sure to rename the handler path to
// '*_unprotected.ts' in the serverless.yml file

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
      lambdaFile: 'welcome_get.unprotected.ts',
      eventData: event,
    }),
  }) as APIGatewayProxyResult;

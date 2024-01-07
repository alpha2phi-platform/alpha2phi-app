import { Context, APIGatewayProxyEventV2 } from "aws-lambda";
import { ApiHandler } from "sst/node/api";

export default function handler(
  lambda: (evt: APIGatewayProxyEventV2, context: Context) => Promise<string>
) {
  return ApiHandler(async (event: APIGatewayProxyEventV2, context: Context) => {
    let body, statusCode;

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (error) {
      statusCode = 500;
      body = JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Return HTTP response
    return {
      body,
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  });
}

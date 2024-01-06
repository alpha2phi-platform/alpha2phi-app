import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { stockTable, portfolioTable } = use(StorageStack);

  const nodeApi = new Api(stack, "nodeApi", {
    defaults: {
      function: {
        bind: [stockTable, portfolioTable],
        runtime: "nodejs20.x",
      },
    },
    routes: {
      "GET /stock": "apps/backend/node/functions/src/stock.list",
    },
  });

  const pythonApi = new Api(stack, "pythonApi", {
    defaults: {
      function: {
        bind: [stockTable, portfolioTable],
        runtime: "python3.11",
      },
    },
    routes: {
      "GET /": "apps/backend/python/functions/lambda.handler",
    },
  });

  stack.addOutputs({
    NodeApiEndpoint: nodeApi.url,
    PythonApiEndpoint: pythonApi.url,
  });

  return {
    nodeApi: nodeApi,
    pythonApi: pythonApi,
  };
}

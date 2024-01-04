import { StackContext, Api, EventBus } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const nodeApi = new Api(stack, "nodeApi", {
    defaults: {
      function: {
        bind: [bus],
        runtime: "nodejs20.x",
      },
    },
    routes: {
      // "GET /": "apps/backend/node/functions/src/lambda.handler",
      "GET /stock": "apps/backend/node/functions/src/stock.list",
      // "POST /todo": "apps/backend/node/functions/src/todo.create",
    },
  });

  const pythonApi = new Api(stack, "pythonApi", {
    defaults: {
      function: {
        runtime: "python3.11",
      },
    },
    routes: {
      "GET /": "apps/backend/python/functions/lambda.handler",
    },
  });

  bus.subscribe("todo.created", {
    handler: "apps/backend/node/functions/src/events/todo-created.handler",
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
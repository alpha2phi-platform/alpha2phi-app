import { StackContext, Api, EventBus } from "sst/constructs";

export function HelloStack({ stack }: StackContext) {
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
      "GET /": "packages/backend/node/functions/src/lambda.handler",
      "GET /todo": "packages/backend/node/functions/src/todo.list",
      "POST /todo": "packages/backend/node/functions/src/todo.create",
    },
  });

  const pythonApi = new Api(stack, "pythonApi", {
    defaults: {
      function: {
        runtime: "python3.11",
      },
    },
    routes: {
      "GET /": "packages/backend/python/functions/lambda.handler",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/backend/node/functions/src/events/todo-created.handler",
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

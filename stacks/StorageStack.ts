import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {

  // Create the DynamoDB table
  const stockTable = new Table(stack, "Stock", {
    fields: {
      symbol: "string",
    },
    primaryIndex: { partitionKey: "symbol" },
  });

  return {
    stockTable: stockTable
  };
}

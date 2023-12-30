import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {

  // Stock table
  const stockTable = new Table(stack, "Stock", {
    fields: {
      symbol: "string",
    },
    primaryIndex: { partitionKey: "symbol" },
  });

  // Portfolio table
  const portfolioTable = new Table(stack, "Portfolio", {
    fields: {
      userId: "string",
      symbol: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "symbol" },
  });


  return {
    stockTable: stockTable,
    portfolioTable: portfolioTable,
  };
}

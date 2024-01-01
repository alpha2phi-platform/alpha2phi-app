import { Table } from "sst/node/table";
import handler from "@alpha2phi/core/handler";
import dynamoDb from "@alpha2phi/core/dynamodb";

export const list = handler(async (event) => {
  const params = {
    TableName: Table.Stock.tableName,
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return JSON.stringify(result.Items);
});

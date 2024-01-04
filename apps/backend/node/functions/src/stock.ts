import { Table } from "sst/node/table";
import handler from "@alpha2phi/core/handler";
import dynamoDb from "@alpha2phi/core/dynamodb";

export const list = handler(async (_event) => {
  const params = {
    TableName: Table.Stock.tableName,
  };

  const result = await dynamoDb.query(params);
  return JSON.stringify(result.Items);
});

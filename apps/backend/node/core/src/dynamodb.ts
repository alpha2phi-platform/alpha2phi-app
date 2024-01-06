import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export default {
  scan: (cmd: ScanCommandInput) => client.send(new ScanCommand(cmd)),
};

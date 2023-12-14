import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { HelloStack } from "./stacks/HelloStack";

export default {
  config(_input) {
    return {
      name: "alpha2phi",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(HelloStack);
  },
} satisfies SSTConfig;

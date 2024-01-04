import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
  config(_input) {
    return {
      name: "alpha2phi",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(FrontendStack);
  },
} satisfies SSTConfig;

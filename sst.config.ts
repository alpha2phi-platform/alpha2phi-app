import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";

export default {
  config(_input) {
    return {
      name: "alpha2phi",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs20.x", // "python3.11",
    });
    app.stack(StorageStack);
  },
} satisfies SSTConfig;

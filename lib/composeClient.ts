import { ComposeClient } from "@composedb/client";
import { RuntimeCompositeDefinition } from "@composedb/types";
import { definition } from "../src/__generated__/definition.js";

export const composeClient = new ComposeClient({
  ceramic: process.env.NEXT_PUBLIC_CERAMIC || "http://localhost:7007",
  // cast our definition as a RuntimeCompositeDefinition
  definition: definition as RuntimeCompositeDefinition,
});

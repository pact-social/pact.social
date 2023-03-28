
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5001/graphql",
  documents: "graphql",
  generates: {
    "src/gql.ts": {
      // preset: "client",
      plugins: [
        "typescript", 
        "typescript-operations",
        // "typescript-generic-sdk"
      ],
      config: {
        dedupeFragments: true,
        inlineFragmentTypes: 'combine'
      },
    }
  }
};

export default config;

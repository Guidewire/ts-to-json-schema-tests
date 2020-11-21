# Generating JSON Schema from TypeScript types

Test JSON Schema generation libraries capabilities.

The purpose of this repository is to show if different
TypeScript to JSON Schema generating libraries
can handle anything more complicated.

## Testing approach

In `src` directory are the library sources to be generated. There are 2 types tests:

- `simple.ts` contains very simple tests case without any external libraries
- `index.tsx` contains example React component with many different possible React types (from [typescript-cheatsheets](https://github.com/typescript-cheatsheets/react#basic-prop-types-examples))

For each tested package, there is generator script in `generators` directory. To run it use:

```shell
yarn generate:<tested-package-name>
```

The generator should generate types for `Simple` and `ExampleProps` types. Output will be stored in `schemas` directory if generation succeeded under following format:

```
<tested-package-name>-<type-name>.json
```

## Installation

Install dependencies using `yarn`.

```shell
yarn
```

## Results

| Library                                                                      | Command                                  | `Simple` | `ExampleProps` |
| ---------------------------------------------------------------------------- | ---------------------------------------- | -------- | -------------- |
| [typescript-json-schema](https://github.com/YousefED/typescript-json-schema) | `yarn generate:typescript-json-schema`   | ✅       | ❌             |
| [ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator) | `yarn generate:ts-json-schema-generator` | ✅       | ❌             |
| [quicktype](https://github.com/quicktype/quicktype)                          | `yarn generate:quicktype`                | ✅       | ❌             |

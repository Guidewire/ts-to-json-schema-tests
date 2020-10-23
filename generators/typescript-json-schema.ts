import { parse } from 'json5';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import * as TJS from 'typescript-json-schema';
import { getGenerate, runAsync } from './helpers';

// https://github.com/YousefED/typescript-json-schema

const tsconfig = parse(readFileSync('./tsconfig.json', 'utf8'));

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
  include: tsconfig.include,
  ignoreErrors: true,
};

const compilerOptions: TJS.CompilerOptions = {
  ...tsconfig.compilerOptions,
};

const typescriptJsonSchemaGenerate = getGenerate(
  'typescript-json-schema',
  async (source, typeName) => {
    const program = TJS.getProgramFromFiles([source], compilerOptions);

    return TJS.generateSchema(program, typeName, settings);
  }
);

runAsync(async () => {
  await typescriptJsonSchemaGenerate(resolve('./src/simple.tsx'), 'Simple');

  await typescriptJsonSchemaGenerate(resolve('./src/index.tsx'), 'ExampleProps');
});

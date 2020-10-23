import * as TSJ from 'ts-json-schema-generator';
import { resolve } from 'path';
import { getGenerate, runAsync } from './helpers';

// https://github.com/vega/ts-json-schema-generator

const tsJsonSchemaGeneratorGenerate = getGenerate(
  'ts-json-schema-generator',
  async (source, typeName) => {
    const config = {
      path: source,
      tsconfig: 'tsconfig.json',
      type: typeName, // Or <type-name> if you want to generate schema for that one type only
    };

    return TSJ.createGenerator(config).createSchema(config.type);
  }
);

runAsync(async () => {
  await tsJsonSchemaGeneratorGenerate(resolve('./src/simple.tsx'), 'Simple');

  await tsJsonSchemaGeneratorGenerate(resolve('./src/index.tsx'), 'ExampleProps');
});

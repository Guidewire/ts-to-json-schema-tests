import {
  BaseType,
  Definition,
  FunctionType,
  SubTypeFormatter,
  createProgram,
  createParser,
  SchemaGenerator,
  createFormatter,
} from 'ts-json-schema-generator';
import { resolve } from 'path';
import { getGenerate, runAsync } from './helpers';

/**
 * Custom type schema formatter for function
 */
class FunctionTypeFormatter implements SubTypeFormatter {
  public supportsType(type: FunctionType): boolean {
    return type instanceof FunctionType;
  }

  public getDefinition(_type: FunctionType): Definition {
    // Return a custom schema for the function property.
    return {
      type: 'string',
    };
  }

  public getChildren(_type: FunctionType): BaseType[] {
    return [];
  }
}

// https://github.com/vega/ts-json-schema-generator

const tsJsonSchemaGeneratorGenerate = getGenerate(
  'ts-json-schema-generator',
  async (source, typeName) => {
    const config = {
      path: source,
      tsconfig: 'tsconfig.json',
      type: typeName, // Or <type-name> if you want to generate schema for that one type only
    };

    // We configure the formatter an add our custom formatter to it.
    const formatter = createFormatter(config, fmt => {
      fmt.addTypeFormatter(new FunctionTypeFormatter());
    });
    const program = createProgram(config);
    const parser = createParser(program, config);
    const generator = new SchemaGenerator(program, parser, formatter, config);

    return generator.createSchema(config.type);
  }
);

runAsync(async () => {
  await tsJsonSchemaGeneratorGenerate(resolve('./src/simple.ts'), 'Simple');

  await tsJsonSchemaGeneratorGenerate(
    resolve('./src/index.tsx'),
    'ExampleProps'
  );
});

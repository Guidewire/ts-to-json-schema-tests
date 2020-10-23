import { writeFileSync } from 'fs';
import * as path from 'path';

export type Generate = (source: string, typeName: string) => Promise<unknown>;
export function getGenerate(name: string, generator: Generate): Generate {
  return async function generate(source, typeName) {
    let schema;

    const getLogMessage = (message: string) => `${name}: ${message}`;

    console.log(getLogMessage(`Generating schema for ${typeName} type.`));
    try {
      schema = await generator(source, typeName);
    } catch (e) {
      console.error(
        getLogMessage(`Failed to generate schema for ${typeName}.`)
      );
      throw e;
    }

    const saveName = `${name}-${typeName}.json`;
    const schemaString = JSON.stringify(schema, null, 2);
    const destination = path.resolve('schemas', saveName);
    writeFileSync(destination, schemaString);
    console.log(
      getLogMessage(`Schema for ${typeName} saved to ${destination}.`)
    );

    console.log(
      getLogMessage(`Successfully generated schema for ${typeName}.`)
    );
  };
}

export async function runAsync(callback: () => Promise<void>) {
  try {
    await callback();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

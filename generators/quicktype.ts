import {
  quicktype,
  InputData,
  JSONSchemaInput,
  JSONSchemaStore,
  JSONSchemaSourceData,
} from 'quicktype-core';
import { resolve } from 'path';
import { schemaForTypeScriptSources } from 'quicktype-typescript-input';
import * as path from 'path';
import { readFileSync } from 'fs';
import { getGenerate, runAsync } from './helpers';

export interface SchemaTypeSource extends JSONSchemaSourceData {
  kind: 'schema';
}

function makeTypeScriptSource(fileNames: string[]) {
  const sources: { [fileName: string]: string } = {};

  for (const fileName of fileNames) {
    const baseName = path.basename(fileName);
    sources[baseName] = readFileSync(fileName, 'utf8');
  }

  return Object.assign(
    { kind: 'schema' },
    schemaForTypeScriptSources(sources)
  ) as SchemaTypeSource;
}

async function quicktypeTS(
  targetLanguage: string,
  typeName: string,
  tsSource: string
) {
  const tsInput = makeTypeScriptSource([tsSource]);
  const inputData = new InputData();
  await inputData.addSource(
    'schema',
    tsInput,
    // @ts-expect-error
    () => new JSONSchemaInput(new JSONSchemaStore())
  );
  return quicktype({
    inputData,
    lang: targetLanguage,
  });
}

const quicktypeGenerate = getGenerate('quicktype', async (source, typeName) => {
  const result = await quicktypeTS('schema', typeName, source);
  return JSON.parse(result.lines.join(''));
});

runAsync(async () => {
  await quicktypeGenerate(resolve('./src/simple.tsx'), 'Simple');

  await quicktypeGenerate(resolve('./src/index.tsx'), 'ExampleProps');
});

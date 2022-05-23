import { Insert, ModificationModel } from '../state/modifications.state';

export function modifyFile(
  file: string,
  modifications: ModificationModel[]
): string {
  let lines = file.split('\n');
  let final: string[] = [];

  let currentLayer = 1;

  for (const line of lines) {
    if (line.endsWith(';gcode-parser-token')) continue;

    final.push(line);

    if (line === ';AFTER_LAYER_CHANGE') {
      const modification = modifications.find(
        (m) =>
          m.location.type === 'after-layer' &&
          m.location['layerNumber'] == currentLayer
      );
      currentLayer++;

      if (modification) {
        for (const insert of modification.inserts) {
          final.push(formatInsert(insert) + ';gcode-parser-token');
        }
      }
    }
  }

  return final.join('\n');
}

export function formatInsert(insert: Insert): string {
  const parts = insert.gcode.gcode.split('{}');

  let result = '';

  for (let i = 0; i < parts.length; i++) {
    result += parts[i];
    if (i < insert.params.length) {
      result += insert.params[i];
    }
  }

  return result;
}

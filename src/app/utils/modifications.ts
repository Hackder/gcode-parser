import {
  AfterLayerModificationLoaction,
  ModificationLocation,
} from '../state/modifications.state';

export function getFormattedName(value: ModificationLocation): string {
  if (value.type === 'after-layer') {
    const v = value as AfterLayerModificationLoaction;
    return `${v.name} ${v.layerNumber}`;
  }

  return 'error';
}

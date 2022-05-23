import { Pipe, PipeTransform } from '@angular/core';
import {
  AfterLayerModificationLoaction,
  ModificationLocation,
} from '../state/modifications.state';
import { getFormattedName } from '../utils/modifications';

@Pipe({
  name: 'modificationFormattedName',
})
export class ModificationFormattedNamePipe implements PipeTransform {
  transform(value: ModificationLocation): string {
    return getFormattedName(value);
  }
}

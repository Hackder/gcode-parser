import { State } from '@ngxs/store';
import { GCodeTemplate } from './gcodes.state';

export interface ModificationLocation {
  type: string;
  name: string;
  getFormattedName(): string;
  readonly modifiableProperties: { key: string; name: string }[];
  [key: string]: any;
}

export class AfterLayerModificationLoaction implements ModificationLocation {
  type = 'after-layer' as const;
  name = 'After Layer' as const;
  getFormattedName = (): string => `${this.name} ${this.layerNumber}`;
  modifiableProperties = [
    {
      key: 'layerNumber',
      name: 'Layer Number',
    },
  ];
  layerNumber: number = 0;
}

export const AllModificationLocations = [AfterLayerModificationLoaction];

export interface Insert {
  gcode: GCodeTemplate;
  params: string[];
}

export interface ModificationModel {
  location: ModificationLocation;
  inserts: Insert[];
}

@State<ModificationModel[]>({
  name: 'modifications',
  defaults: [],
})
export class ModificationsState {}

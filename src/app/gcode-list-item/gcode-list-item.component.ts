import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GCodeTemplate } from '../state/gcodes.state';

@Component({
  selector: 'app-gcode-list-item',
  templateUrl: './gcode-list-item.component.html',
  styleUrls: ['./gcode-list-item.component.scss'],
})
export class GCodeListItemComponent {
  @Input() gcode: GCodeTemplate | undefined;

  @Output('onEdit') onEdit = new EventEmitter();

  constructor() {}
}

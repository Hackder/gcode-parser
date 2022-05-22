import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Insert } from '../state/modifications.state';

@Component({
  selector: 'app-gcode-insert-view',
  templateUrl: './gcode-insert-view.component.html',
  styleUrls: ['./gcode-insert-view.component.scss'],
})
export class GCodeInsertViewComponent {
  private _insert: Insert | undefined;

  @Input() set insert(insert: Insert) {
    this._insert = insert;
    this.parts = this.calculateInsertParts(insert);
  }
  get insert(): Insert {
    return this._insert!;
  }

  @Input()
  number: number = 0;

  @Output()
  onDelete = new EventEmitter();

  parts: InsertPart[] = [];

  calculateInsertParts(insert: Insert): InsertPart[] {
    const parts: InsertPart[] = [];

    const stringParts = insert.gcode.gcode.split('{}');

    for (let i = 0; i < stringParts.length * 2 - 1; i++) {
      if (i % 2 === 0) {
        parts.push({
          type: 'text',
          text: stringParts[i / 2],
        });
      } else {
        parts.push({
          type: 'prop',
          text: insert.params[Math.floor(i / 2)],
        });
      }
    }

    return parts;
  }

  constructor() {}
}

type InsertPart = TextPart | PropPart;

interface TextPart {
  type: 'text';
  text: string;
}

interface PropPart {
  type: 'prop';
  text: string;
}

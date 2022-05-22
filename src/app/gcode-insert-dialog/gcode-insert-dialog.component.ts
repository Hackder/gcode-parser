import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { FilterService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, map, Observable, tap } from 'rxjs';
import { GCodeSearchService } from '../services/gcode-search.service';
import { GCodeTemplate } from '../state/gcodes.state';
import { Insert } from '../state/modifications.state';

@Component({
  selector: 'app-gcode-insert-dialog',
  templateUrl: './gcode-insert-dialog.component.html',
  styleUrls: ['./gcode-insert-dialog.component.scss'],
})
export class GCodeInsertDialogComponent implements OnInit {
  results: GCodeTemplate[] = [];

  gcodeForm = new FormGroup({
    gcodeTemplate: new FormControl([Validators.required]),
    properties: new FormGroup({}),
  });

  get gcodeTemplate() {
    return this.gcodeForm.get('gcodeTemplate');
  }

  templateParts: Observable<TemplatePart[]>;

  constructor(
    private ref: DynamicDialogRef,
    private gcodesSearch: GCodeSearchService,
    private filterService: FilterService
  ) {
    this.templateParts = this.gcodeTemplate!.valueChanges.pipe(
      filter(Boolean),
      map((template) => this.getTemplateParts(template)),
      tap((parts) => this.setupFormProperties(parts))
    );
  }

  setupFormProperties(parts: TemplatePart[]) {
    const fg = new FormGroup({});

    for (const part of parts) {
      if (part.type === 'prop') {
        fg.addControl(part.name, new FormControl('', [Validators.required]));
      }
    }

    this.gcodeForm.setControl('properties', fg);
  }

  ngOnInit(): void {
    this.search('');

    this.filterService.register('alwaysTrue', () => true);
  }

  search(query: string) {
    this.results = this.gcodesSearch.search(query ?? '');
  }

  onFilter(event: any) {
    this.search(event.filter);
  }

  getTemplateParts(template: GCodeTemplate): TemplatePart[] {
    const stringParts = template.gcode.split('{}');
    const parts: TemplatePart[] = [];

    for (let i = 0; parts.length < stringParts.length * 2 - 1; i++) {
      if (i % 2 === 0) {
        parts.push({
          type: 'text',
          text: stringParts[i / 2],
        });
      } else {
        parts.push({
          type: 'prop',
          name: `name${Math.floor(i / 2)}`,
        });
      }
    }

    return parts;
  }

  addGCode() {
    const insert: Insert = {
      gcode: this.gcodeTemplate!.value as GCodeTemplate,
      params: Object.entries(
        this.gcodeForm.get('properties')!.value as Record<string, string>
      )
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((x) => x[1]),
    };

    this.ref.close(insert);
  }
}

interface TemplateText {
  type: 'text';
  text: string;
}

interface TemplateProp {
  type: 'prop';
  name: `name${number}`;
}

type TemplatePart = TemplateText | TemplateProp;

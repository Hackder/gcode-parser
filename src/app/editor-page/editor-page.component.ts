import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GCodeFile } from '../types/file';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent implements OnInit {
  file: GCodeFile;

  constructor(route: ActivatedRoute) {
    this.file = route.snapshot.data['file'];
  }

  ngOnInit(): void {}
}

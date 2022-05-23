import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { fs } from '@tauri-apps/api';
import {
  ModificationModel,
  ModificationsState,
} from '../state/modifications.state';
import { GCodeFile } from '../types/file';
import { modifyFile } from '../utils/modifyFile';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPageComponent {
  file: GCodeFile;

  constructor(route: ActivatedRoute, private store: Store) {
    this.file = route.snapshot.data['file'];
  }

  saveModified(path: string) {
    const currentModifications =
      this.store.selectSnapshot<ModificationModel[]>(ModificationsState);

    fs.writeFile({
      contents: modifyFile(this.file.content, currentModifications),
      path,
    });
  }
}

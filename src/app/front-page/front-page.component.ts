import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { dialog } from '@tauri-apps/api';
import { Observable } from 'rxjs';
import { OpenFile } from '../state/files.actions';
import { FilesState } from '../state/files.state';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  recentlyOpenedFiles: Observable<string[]>;

  constructor(private store: Store) {
    this.recentlyOpenedFiles = store.select(
      (state) => state.files.recentlyOpened
    );
  }

  async openDialog() {
    const path = await dialog.open({
      title: 'Open gcode file',
      multiple: false,
      filters: [
        { name: 'Gcode', extensions: ['gcode'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });

    if (!path) return;

    this.openFile(path as string);
  }

  openFile(path: string) {
    this.store.dispatch(new OpenFile(path));
  }

  ngOnInit(): void {}
}

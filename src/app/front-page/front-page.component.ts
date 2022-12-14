import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { dialog } from '@tauri-apps/api';
import { Observable } from 'rxjs';
import { OpenFile } from '../state/files.actions';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  locationText: string = '';

  changeLanguage() {
    // this.locationText = JSON.stringify(window.location, null, 2);
    // return;

    if (window.location.href.includes('en-US')) {
      window.location.pathname = '/sk-SK';
      localStorage.setItem('language', 'sk-SK');
    } else {
      window.location.pathname = '/en-US';
      localStorage.setItem('language', 'en-US');
    }
  }

  ngOnInit(): void {
    const language = localStorage.getItem('language');
    if (!language || language === 'en-US') return;
    if (window.location.href.includes('sk-SK')) return;

    this.changeLanguage();
  }
}

import { Component, OnInit } from '@angular/core';
import { dialog } from '@tauri-apps/api';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  recentlyOpened: string[] = [
    'src/app/front-page/front-page.component.ts',
    'src/app/app.module.ts',
    'src/app/app-routing.module.ts',
    'src/app/app.component.html',
  ];

  constructor() {}

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
    console.log('Opened file', path);
  }

  ngOnInit(): void {}
}

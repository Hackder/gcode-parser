import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Base64 } from 'js-base64';
import { from, map, Observable } from 'rxjs';
import { GCodeFile } from '../types/file';
import { fs } from '@tauri-apps/api';

@Injectable({
  providedIn: 'root',
})
export class GCodeFileResolver implements Resolve<GCodeFile> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GCodeFile> {
    const encodedFilepath = route.paramMap.get('b64filepath')!;
    const filepath = Base64.decode(encodedFilepath);

    return from(fs.readTextFile(filepath)).pipe(
      map((text) => ({
        filepath,
        content: text,
      }))
    );
  }
}

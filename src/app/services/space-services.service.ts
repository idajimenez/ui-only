import { Injectable } from '@angular/core';
import { tap } from 'lodash';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  // !IMPORTANT
  // THIS FUNCTION IS FOR LIVE REFRESH FOR GETTING THE DATA
  private _liveRefreshData$ = new Subject<any>();
  liveAutoRefresh(): Observable<any> {
    return this._liveRefreshData$.asObservable();
  }
  // END

  public tempData: any = {
    isAdjacentEnabled: false,
    spaces: [],
    selectedSpace: null,
    isMax: false
  };

  constructor() { }

  // !IMPORTANT
  // FUNCTION FOR PASSING THE DATA INTO TEMP DATA VAR
  passData(data?: any) {
    this.tempData = {...this.tempData, ...data};
    console.log('data', this.tempData)
    this._liveRefreshData$.next();
  }
  // END

}

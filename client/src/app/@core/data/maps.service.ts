import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MapsService {

  constructor(private http: HttpClient) {
  }

  searchMaps(query: string): Observable<any> {
    return this.http.get('/api/maps/?search=' + query);
  }
  getMap(id: string): Observable<any> {
    return of({
      id: id,
      name: 'Lego Land',
      info: {
        id: id,
        totalDownloads: '100',
        avatarURL: '<img src="assets\\images\\Lego2.jpg" height="250px" width="px">',
        description: 'test',
        numBonuses: 10,
        numCheckpoints: 12,
        numStages: 7,
        difficulty: 9,
      },
    });
   // return this.http.get('/api/maps/' + id);
  }
}
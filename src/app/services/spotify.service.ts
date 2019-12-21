import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery( query: string){

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA5Oo97ar29WpDmNPtHD_0HCtpvHSt2jiqWdTIg9Yl5Rpn5R_SPBAsCODCZenUXHqVSCWZWf4MMS26atYA'
    })

    return this.http.get(url, { headers });

  }

  getNewReleases(){

    return(
      this.getQuery('browse/new-releases')
          .pipe( map( data => {
            return data['albums'].items
          }))
    )
  }

  getArtists(termino: string){

    return (
      this.getQuery(`search?q=${termino}&type=artist&limit=20`)
          .pipe( map( data => {
            return data['artists'].items
          }))      
      )
  }

  getArtista(id: string){
    return (
      this.getQuery(`artists/${id}`)
    )
  }

  getTopTracks(id: string){
    return (
      this.getQuery(`artists/${id}/top-tracks?country=es`)
          .pipe( map( data => {
            return data['tracks']
          }))
    )
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) { }

  getTrending(mediaType:string):Observable<any>
  {
       return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=ef49d952462cc1767d27f6505af78c10`)
  }
  getSimilar(mediaType:string , id:string):Observable<any>
  {
       return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=ef49d952462cc1767d27f6505af78c10&language=en-US&page=1`)
  }
  getItemDetails(mediaType:string , id:string):Observable<any>
  {
       return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=ef49d952462cc1767d27f6505af78c10&language=en-US`)
  }
}

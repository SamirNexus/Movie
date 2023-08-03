import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

trendingMovies:any[]=[];
trendingTv:any[]=[];
trendingPeople:any[]=[];
term:string='';

  constructor(private _MoviesService:MoviesService) { }

  ngOnInit(): void {
    this._MoviesService.getTrending('movie').subscribe({
      next:(data)=>this.trendingMovies=data.results.slice(0,10),
    })
    this._MoviesService.getTrending('tv').subscribe({
      next:(data)=>this.trendingTv=data.results.slice(0,10),
    })
    this._MoviesService.getTrending('person').subscribe({
      next:(data)=>this.trendingPeople=data.results.filter((item:any)=>item.profile_path != null).slice(0,10),
    })
  }

}

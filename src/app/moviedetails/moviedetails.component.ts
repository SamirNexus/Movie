import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  mediaType:string='';
  item:any;
  similarMoves:any[]=[];
  constructor(private _ActivatedRoute:ActivatedRoute , private _MoviesService:MoviesService) { }

  ngOnInit(): void {
   let {id , media_type}= this._ActivatedRoute.snapshot.params;
   this.mediaType=media_type;
   
   this._MoviesService.getItemDetails(media_type,id).subscribe({
    next:(data)=>this.item=data
   })
   
   this._MoviesService.getSimilar(media_type,id).subscribe({
    next:(data)=> this.similarMoves=data.results.slice(0,6)
   })
  }

  getSimilar(media_type:string,id:string){
    this._MoviesService.getItemDetails(media_type,id).subscribe({
      next:(data)=>this.item=data
     })
     
    this._MoviesService.getSimilar(media_type,id).subscribe({
      next:(data)=> this.similarMoves=data.results.slice(0,6)
     })
  }
}

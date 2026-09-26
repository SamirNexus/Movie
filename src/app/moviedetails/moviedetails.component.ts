import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../movies.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  mediaType = '';
  item: any;
  similarMoves: any[] = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _MoviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      const mediaType = params.get('media_type');

      if (!id || !mediaType) {
        return;
      }

      this.mediaType = mediaType;
      this.loadMedia(mediaType, id);
    });
  }

  getSimilar(mediaType: string, id: string): void {
    this.loadMedia(mediaType, id);
  }

  private loadMedia(mediaType: string, id: string): void {
    this._MoviesService.getItemDetails(mediaType, id).subscribe({
      next: (data) => this.item = data,
    });

    this._MoviesService.getSimilar(mediaType, id).subscribe({
      next: (data) => this.similarMoves = data.results.slice(0, 6),
    });
  }
}

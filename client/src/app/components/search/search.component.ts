import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    console.log('search called');
  }

  onClickSearch() {
    //TODO: call search function in spotifyService and parse response
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then(data => {
      this.resources = data;

      //For debugging purposes
      console.log('Calling searchFor function in spotifyService');
      console.log(this.resources);
    });
  }

}

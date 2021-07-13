import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  relatedArtistCarouselId:string;
  albumCarouselId:string;


  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums

    //Get the artist data
    this.spotifyService.getArtist(this.artistId).then(data => {
      this.artist = data;
      //For debugging purposes
      console.log('Calling getArtist function in spotifyService');
      console.log(this.artist);
    });

    //Get the related artists
    this.spotifyService.getRelatedArtists(this.artistId).then(data => {
      this.relatedArtists = data;
      this.relatedArtistCarouselId = 'artist';
      //For debugging purposes
      console.log('Calling getRelatedArtists function in spotifyService');
      console.log(this.relatedArtists);
    });

    //Get the top tracks
    this.spotifyService.getTopTracksForArtist(this.artistId).then(data => {
      this.topTracks = data;
      //For debugging purposes
      console.log('Calling getTopTracksForArtist function in spotifyService');
      console.log(this.topTracks);
    });

    //Get the albums
    this.spotifyService.getAlbumsForArtist(this.artistId).then(data => {
      this.albums = data;
      this.albumCarouselId = 'album';
      //For debugging purposes
      console.log('Calling getAlbumsForArtist function in spotifyService');
      console.log(this.albums);
    });
  }

}

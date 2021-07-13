import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server

    let url = this.expressBaseUrl + endpoint;

    return Promise.resolve(this.http.get(url).toPromise());
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.

    let encoded_URI:string = encodeURIComponent(resource);
    return this.sendRequestToExpress('/search/' + category + '/' + encoded_URI).then((data) => {
      if(category == 'artist') {
        let res:ArtistData[] = new Array();

        data['artists']['items'].forEach(element => {
          res.push(new ArtistData(element));
        });
        return res;
      }

      else if(category == 'track') {
        let res:TrackData[] = new Array();

        data['tracks']['items'].forEach(element => {
          res.push(new TrackData(element));
        });
        return res;
      }

      else if(category == 'album') {
        let res:AlbumData[] = new Array();

        data['albums']['items'].forEach(element => {
          res.push(new AlbumData(element));
        });
        return res;
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    let encodedArtistId:string = encodeURIComponent(artistId);
    // Endpoint: '/artist/:id'
    // Endpoint used: '/artist/artistId'
    return this.sendRequestToExpress('/artist/'+encodedArtistId).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    let encodedArtistId:string = encodeURIComponent(artistId);
    // Endpoint: '/artist-related-artists/:id'
    // Endpoint used: '/artist-related-artists/artistId'
    return this.sendRequestToExpress('/artist-related-artists/'+encodedArtistId).then((data) => {
      let artistData:ArtistData[];
      artistData = data['artists'].map((artist)=> {
        return new ArtistData(artist);
      });
      return artistData;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    let encodedArtistId:string = encodeURIComponent(artistId);
    // Endpoint: '/artist-top-tracks/:id'
    // Endpoint used: '/artist-top-tracks/artistId'
    return this.sendRequestToExpress('/artist-top-tracks/'+encodedArtistId).then((data) => {
      let trackData: TrackData[];
      trackData = data['tracks'].map((track)=> {
        return new TrackData(track);
      });
      return trackData;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    let encodedArtistId:string = encodeURIComponent(artistId);
    // Endpoint: '/artist-albums/:id'
    // Endpoint used: /artist-albums/${artistId}'
    return this.sendRequestToExpress('/artist-albums/'+encodedArtistId).then((data) => {
      let albumData: AlbumData[];
      albumData = data['items'].map((artist)=>{
        return new AlbumData(artist);
      });
      return albumData;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    let encodedAlbumId:string = encodeURIComponent(albumId);

    // Endpoint: '/album/:id'
    // Endpoint used: '/album/'+albumId
    return this.sendRequestToExpress('/album/'+encodedAlbumId).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    let encodedAlbumId:string = encodeURIComponent(albumId);

    // Endpoint: '/album-tracks/:id'
    // Endpoint used: '/album-tracks/'+albumId
    console.log('test');
    return this.sendRequestToExpress('/album-tracks/'+encodedAlbumId).then((data) => {
      let trackData: TrackData[];

      trackData = data['items'].map((element)=> {
       return new TrackData(element);
     });

      console.log('This is trackData');
      console.log(trackData);
      return trackData;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    let encodedTrackId:string = encodeURIComponent(trackId);

    // Endpoint: '/track/:id'
    // Endpoint used: '/track/trackId'
    return this.sendRequestToExpress('/track/'+encodedTrackId).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    let encodedTrackId:string = encodeURIComponent(trackId);

    // Endpoint: '/track-audio-features/:id'
    // Endpoint used: '/track-audio-features/trackId'
    // static FeatureTypes = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence'];

    return this.sendRequestToExpress('/track-audio-features/'+encodedTrackId).then((data) => {
      let trackFeature:TrackFeature[] = new Array();

      //Get all the track features
      let dance:TrackFeature = new TrackFeature('danceability', data['danceability']);
      let energy:TrackFeature = new TrackFeature('energy', data['energy']);
      let speech:TrackFeature = new TrackFeature('speechiness', data['speechiness']);
      let acoustic:TrackFeature = new TrackFeature('acousticness', data['acousticness']);
      let instrument:TrackFeature = new TrackFeature('instrumentalness', data['instrumentalness']);
      let live:TrackFeature = new TrackFeature('liveness', data['liveness']);
      let valence:TrackFeature = new TrackFeature('valence', data['valence']);


      //Push the track features into trackFeature array
      trackFeature.push(dance);
      trackFeature.push(energy);
      trackFeature.push(speech);
      trackFeature.push(acoustic);
      trackFeature.push(instrument);
      trackFeature.push(live);
      trackFeature.push(valence);

      console.log(data);

      return trackFeature;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DeezerApiService } from 'src/app/api/deezer-api.service';
import { IArtist } from 'src/app/interfaces/iartist';
import { ITrack } from 'src/app/interfaces/itrack';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public title = 'Deezer Search';
  public queryInput: any = '';
  public artistQuery = '';
  public matchingTracks!: ITrack[];
  public matchingArtists!: IArtist[];

  constructor(private deezerApiService: DeezerApiService) {}

  public ngOnInit(): void {}

  public search(): void {
    // query deezer service
    this.deezerApiService.searchArtists(this.queryInput).subscribe(
      (result: any) => {
        console.log('Received data.', JSON.stringify(result));
        this.artistQuery = this.queryInput;
        this.matchingArtists = result;
      },
      (error: any) => {
        console.error('Could net receive data.');
      },
      () => {
        console.warn('Search complete.');
      }
    );
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DeezerApiService } from 'src/app/api/deezer-api.service';
import { IAlbum } from 'src/app/interfaces/ialbum';
import { IArtist } from 'src/app/interfaces/iartist';
import { ITrack } from 'src/app/interfaces/itrack';

@Component({
  selector: 'app-artist-drilldown',
  templateUrl: './artist-drilldown.component.html',
  styleUrls: ['./artist-drilldown.component.scss'],
})
export class ArtistDrilldownComponent implements OnInit {
  public artist: IArtist | undefined;
  public albums: IAlbum[] = [];
  public tracks: ITrack[] = [];
  public errorMessage = '';

  constructor(
    private deezerApiService: DeezerApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.GetArtistDetails(id);
    }
  }
  public GetArtistDetails(id: number): void {
    forkJoin([
      this.deezerApiService.getArtist(id),
      this.deezerApiService.getAlbums(id),
      this.deezerApiService.getTopTracks(id)
    ])
      .pipe()
      .subscribe({
        next: Results => {
          (this.artist = Results[0]),
            (this.albums = Results[1]),
            (this.tracks = Results[2]);
        },
        error: err => (this.errorMessage = err)
      });
  }
  public onBack(): void {
    this.router.navigate(['/']);
  }
}


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeezerApiService } from 'src/app/api/deezer-api.service';
import { IArtist } from 'src/app/interfaces/iartist';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  @Input() public artist!: IArtist;

  constructor(
    private deezerApiService: DeezerApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.deezerApiService.getArtist(this.artist.id).subscribe(
      (artist: IArtist) => {
        this.artist = artist;
      },
      (error: any) => {
        console.error('Could not fetch artist.');
      },
      () => {
        console.warn('Query complete.');
      }
    );
  }

  public navToArtist(): void {
    const fragment = this.route.snapshot.pathFromRoot;

    this.router.navigate([ `${this.artist.id}` ]);
  }

}

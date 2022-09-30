import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { tap, map, distinct, catchError } from 'rxjs/operators';
import { ITrack } from '../interfaces/itrack';
import { IArtist } from '../interfaces/iartist';
import { ISearchResult } from '../interfaces/isearch-result';
import { IAlbum } from '../interfaces/ialbum';

@Injectable({
  providedIn: 'root',
})
export class DeezerApiService {
  private deezerApiUrl = 'https://api.deezer.com/';
  private corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private defaultPageSize = 25;

  constructor(private http: HttpClient) {}

  searchArtists(query: string): Observable<ISearchResult> {
    const searchUrl = `${this.corsProxyUrl}${this.deezerApiUrl}search?q=artist:"${query}"&strict=on`;

    return this.http
      .get<ISearchResult>(searchUrl)
      .pipe(
        this.mapDistinctTrackArtistsFromSearchResult,
        catchError(this.handleError)
      );
  }

  public getArtist(id: number): Observable<IArtist> {
    const artistUrl = `${this.corsProxyUrl}${this.deezerApiUrl}artist/${id}`;

    return this.http.get<IArtist>(artistUrl).pipe(catchError(this.handleError));
  }

  public getAlbums(artistId: number): Observable<IAlbum[]> {
    const albumUrl = `${this.corsProxyUrl}${this.deezerApiUrl}artist/${artistId}/albums&offset=0`;

    return this.http.get<IAlbum>(albumUrl).pipe(
      map((res: any) => res.data as IAlbum[]),
      catchError(this.handleError)
    );
  }

  public getTopTracks(id: number): Observable<ITrack[]> {
    const trackUrl = `${this.corsProxyUrl}${this.deezerApiUrl}artist/${id}/top?limit=5`;

    return this.http.get<ITrack[]>(trackUrl).pipe(
      map((res: any) => res.data as ITrack[]),
      catchError(this.handleError)
    );
  }

  private mapDistinctTrackArtistsFromSearchResult(
    source: Observable<ISearchResult>
  ): Observable<any> {
    return new Observable((subscriber) => {
      source.subscribe((result: ISearchResult) => {
        const districtArtists: IArtist[] = result.data.reduce(
          (accumulator: IArtist[], item: ITrack, index: number) => {
            const existingArtist: IArtist | undefined = accumulator.find(
              (a) => a.id === item.artist.id
            );

            if (!existingArtist) {

              accumulator.push(item.artist);
            }
            return accumulator;
          },
          []
        );

        subscriber.next(districtArtists);

        subscriber.complete();
      });
    });
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    console.error('HTTP request failed: ', error.message);

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `HTTP get error: ${error.error.message}`;
    } else {
      errorMessage = `HTTP ${error.status} returned: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}

@Injectable()
export class CorsAnywhereInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('Intercepting request to include origin header');

    const corsRequest = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
    });

    return next.handle(corsRequest);
  }
}

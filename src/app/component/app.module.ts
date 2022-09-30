import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistDrilldownComponent } from './artist-drilldown/artist-drilldown.component';
import { HomeComponent } from './home/home.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsAnywhereInterceptor } from '../api/deezer-api.service';
import { ConvertToDurationPipe } from '../utils/convert-to-duration.pipe';
import { ConvertToYearPipe } from '../utils/convert-to-year.pipe';
import { ShortNumberPipe } from '../utils/short-number.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistDrilldownComponent,
    ArtistCardComponent,
    ConvertToYearPipe,
    ShortNumberPipe,
    ConvertToDurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CorsAnywhereInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

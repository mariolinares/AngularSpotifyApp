import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  albums: any[] = [];
  loading: boolean;
  error: boolean;
  mensaje: string;

  constructor(private spotify: SpotifyService) {

    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
      .subscribe( (data: any) => {
        console.log(data)

        this.albums = data;
        this.loading = false;

      }, (errorServicio) => {

        this.loading = false;
        this.error = true;
        this.mensaje = errorServicio.error.error.message;
      })

  }

  ngOnInit() {
  }

}

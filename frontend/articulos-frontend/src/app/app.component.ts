import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { ArticuloComponent } from './articulo/articulo.component';


@Component({
  selector: 'app-root',
  //imports: [RouterOutlet, UserComponent],
  imports: [ArticuloComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  admin = true;

  changeAdmin() {
    this.admin = !this.admin;
  }
}

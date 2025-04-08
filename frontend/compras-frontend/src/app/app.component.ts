import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompraComponent } from "./compra/compra.component";

@Component({
  selector: 'app-root',
  imports: [CompraComponent],
  //imports: [RouterOutlet, CompraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'compras-frontend';
}

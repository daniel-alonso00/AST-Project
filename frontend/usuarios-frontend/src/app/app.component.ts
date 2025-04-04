import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from "./usuario/usuario.component";

@Component({
  selector: 'app-root',
  imports: [UsuarioComponent],
  //imports: [RouterOutlet, UsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'usuarios-frontend';
}

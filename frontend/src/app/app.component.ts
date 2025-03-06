import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  admin = true;

  changeAdmin() {
    this.admin = !this.admin;
  }
}

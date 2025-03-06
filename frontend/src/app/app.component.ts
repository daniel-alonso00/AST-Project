import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { HolaComponent } from './hola/hola.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestComponent, HolaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  admin = true;

  changeAdmin() {
    this.admin = !this.admin;
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  apiURL: String = 'http://127.0.0.1:8080'

  anillos: any;
  collares: any;
  pendientes: any;
  pulseras: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchAnillos();
    this.fetchCollares();
    this.fetchPendientes();
    this.fetchPulseras();
  }

  fetchAnillos() {
    this.http.get(apiURL + '/anillos')
      .subscribe(data => {
        this.anillos = data;
      });
  }

  fetchCollares() {
    this.http.get(apiURL + '/collares')
      .subscribe(data => {
        this.collares = data;
      });
  }

  fetchPendientes() {
    this.http.get(apiURL + '/pendientes')
      .subscribe(data => {
        this.pendientes = data;
      });
  }

  fetchPulseras() {
    this.http.get(apiURL + '/pulseras')
      .subscribe(data => {
        this.pulseras = data;
      });
  }

  createAnillo(formData) {
    this.http.post(apiURL + '/anillo', formData)
      .subscribe(responseData => {
        console.log(responseData)
      })
  }

}

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

  currentDisp: any;   // Variable que se muestra en el HTML

  // Variables que contienen data de la tienda
  anillos: any;
  collares: any;
  pendientes: any;
  pulseras: any;
  allItems: any;    // Concatenación de las tres anteriores

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateData()
  }

  // --- UTIL ---

  updateData() {
    this.fetchAnillos();
    this.fetchCollares();
    this.fetchPendientes();
    this.fetchPulseras();

    this.allItems = this.anillos.concat(this.collares.concat(this.pendientes.concat(this.pulseras)));
    this.currentDisp = this.allItems;
  }

  // --- READ ---

  fetchAnillos() {
    this.http.get(this.apiURL + '/anillos')
      .subscribe(data => {
        this.anillos = data;
      });
  }

  fetchCollares() {
    this.http.get(this.apiURL + '/collares')
      .subscribe(data => {
        this.collares = data;
      });
  }

  fetchPendientes() {
    this.http.get(this.apiURL + '/pendientes')
      .subscribe(data => {
        this.pendientes = data;
      });
  }

  fetchPulseras() {
    this.http.get(this.apiURL + '/pulseras')
      .subscribe(data => {
        this.pulseras = data;
      });
  }

  createAnillo(formData: {}) {
    this.http.post(this.apiURL + '/anillo', formData)
      .subscribe(responseData => {
        console.log(responseData)
      })
  }
}

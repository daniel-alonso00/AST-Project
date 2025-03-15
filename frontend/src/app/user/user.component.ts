import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // apiURL: String = 'http://127.0.0.1:8080'
  apiURL: String = 'http://localhost:8080'

  showForm = "hidden";

  placeString = "Gema del anillo"
  actionDir = "/anillo"

  addForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    extra: new FormControl(''),
  });

  currentDisp: any;   // Variable que se muestra en el HTML

  // Variables que contienen data de la tienda
  anillos: any;
  collares: any;
  pendientes: any;
  pulseras: any;
  allItems: any;    // Concatenación de las tres anteriores

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateData();
  }

  // --- UTIL ---

  updateData() {
    this.fetchAnillos();
    this.fetchCollares();
    this.fetchPendientes();
    this.fetchPulseras();

    this.allItems = []
    if (this.anillos) {
      this.allItems = this.allItems.concat(this.anillos)
    }
    if (this.collares) {
      this.allItems = this.allItems.concat(this.collares)
    }
    if (this.pendientes) {
      this.allItems = this.allItems.concat(this.pendientes)
    }
    if (this.pulseras) {
      this.allItems = this.allItems.concat(this.pulseras)
    }
    this.currentDisp = this.allItems;
  }

  onSubmit() {
    console.log(this.apiURL + this.actionDir);

    this.http.post<any>(this.apiURL + this.actionDir, {
      nombre: this.addForm.value.nombre ?? '',
      precio: this.addForm.value.precio ?? '',
      extra: this.addForm.value.extra ?? '',
    }).subscribe(data => {
      this.updateData()
    }, error => {
      console.log(error)
    })
  }

  filterSelect(option: string) {
    switch (option) {
      case "todos":
        this.currentDisp = this.allItems
        break;

      case "anillos":
        this.currentDisp = this.anillos
        break;

      case "collares":
        this.currentDisp = this.collares
        break;

      case "pendientes":
        this.currentDisp = this.pendientes
        break;

      case "pulseras":
        this.currentDisp = this.pulseras
        break;
    }
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

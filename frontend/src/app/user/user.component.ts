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

  showForm = "hidden";          // Formulario HTML para crear
  showUpdateForm = "hidden";    // Formulario HTML para actualizar
  placeUpdateString = "Placeholder";
  updatingId = "";

  creatingTipo: Number;

  addForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    extra: new FormControl(''),
  });

  updateForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    extra: new FormControl(''),
  });

  currentDisp: any;   // Variable que se muestra en el HTML

  // Variables que contienen data de la tienda
  displayItems: any;    // Concatenación de las tres anteriores

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateData();
  }

  // --- UTIL ---

  updateData() {
    this.readJoyas();
  }

  handleShowUpdate(_id: string) {
    this.showUpdateForm = "visible";
    this.updatingId = _id;
  }

  onSubmit() {
    this.http.post<any>(this.apiURL + this.actionDir, {
      nombre: this.addForm.value.nombre ?? '',
      precio: this.addForm.value.precio ?? '',
      extra: this.addForm.value.extra ?? '',
    }).subscribe(data => {
      alert(data.message)
      this.updateData()
    }, error => {
      alert(error)
    })
  }

  onUpdateSubmit() {
  }

  filterSelect(option: string) {
    switch (option) {
      case "todos":
        break;

      case "anillos":
        break;

      case "collares":
        break;

      case "pendientes":
        break;

      case "pulseras":
        break;
    }
  }

  // --- READ ---

  readJoyas() {
    this.http.get(this.apiURL + '/inventario')
      .subscribe(data => {
        this.displayItems = data;
      });
  }
}

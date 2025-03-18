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
  apiURL = 'http://localhost:8080'

  tipoEnum = {
    anillo: 0,
    collar: 1,
    pendiente: 2,
    pulsera: 3
  }

  showForm = "hidden";          // Formulario HTML para crear
  showUpdateForm = "hidden";    // Formulario HTML para actualizar
  updatingId = "";

  creatingTipo = 0;

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
    this.readJoyas();
  }

  // --- UTIL ---

  handleShowUpdate(_id: string) {
    this.showUpdateForm = "visible";
    this.updatingId = _id;
  }

  onSubmit() {
    this.http.post<any>(this.apiURL + '/inventario', {
      nombre: this.addForm.value.nombre ?? '',
      precio: this.addForm.value.precio ?? '',
      extra: this.addForm.value.extra ?? '',
    }).subscribe(data => {
      alert(data.message)
      this.readJoyas();
    }, error => {
      alert(error)
    })
  }

  onUpdateSubmit() {

  }

  filterSelect(tipo: Number) {
    this.http.put<any>(this.apiURL + '/getTipo', { tipo: tipo })
  }

  eliminarItem(_id: String){
    this.http.delete('/inventario')
  }

  // --- READ ---

  readJoyas() {
    this.http.get(this.apiURL + '/inventario')
      .subscribe(data => {
        this.displayItems = data;
      });
  }
}

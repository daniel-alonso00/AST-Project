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
  apiURL = 'http://localhost:8080'

  tipoEnum = {
    anillo: 0,
    collar: 1,
    pendiente: 2,
    pulsera: 3
  }

  displayItems: any;            // Concatenación de las tres anteriores
  showForm = "hidden";          // Formulario HTML para crear
  showUpdateForm = "hidden";    // Formulario HTML para actualizar

  updatingId = "";
  creatingTipo = 0;

  searchForm = new FormGroup({
    id: new FormControl('')
  });

  addForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    cantidad: new FormControl('')
  });

  updateForm = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(''),
    cantidad: new FormControl('')
  });

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
      tipo: this.creatingTipo,
      nombre: this.addForm.value.nombre ?? '',
      precio: this.addForm.value.precio ?? '',
      cantidad: this.addForm.value.cantidad ?? ''
    }).subscribe(data => {
      alert(data.message)
      this.readJoyas();
      this.showForm = 'hidden';
      this.addForm.reset();
    }, error => {
      alert(error)
    })
  }

  onUpdateSubmit() {

  }

  onSearchSubmit() {
    this.http.put<any>(this.apiURL + '/getById', {_id: this.searchForm.value.id ?? ''})
      .subscribe(data => {
        this.displayItems = [data.joya];
      }, error => {
        alert(error.message)
      })
  }

  filterSelect(tipo: Number) {
    if (tipo == 4) {
      this.readJoyas();
    } else {
      this.http.put<any>(this.apiURL + '/getTipo', { tipo: tipo })
        .subscribe(data => {
          console.log(data)
          this.displayItems = data.joyas;
        }, error => {
          alert(error.message)
        })
    }
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

import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';


@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  apiURL = 'http://localhost:8060'

  rolEnum ={
    administrador: "administrador",
    cliente: "cliente"
  }

  displayItems: any;  //Contiene el array de los usuarios

  showFormCreate = "hidden";  // Ponemos el formulario de creacion de usuarios en oculto

  //Constructor para el cliente HTTP
  constructor(private http: HttpClient) {}

  // Caja para introducir el id para hacer cualquier cosa
  boxIdUser = new FormGroup({
    userId: new FormControl('')
  })

  ngOnInit(){
    this.displayItems
  }

  //FormGroup para la creacion de usuarios
  addForm = new FormGroup({
    nombre: new FormControl(''),
    rolUsuario: new FormControl(this.rolEnum.cliente)
  });

  onSubmit() {
    this.http.post<any>(this.apiURL + '/usuario',{
      rolUsuario: this.addForm.value.rolUsuario ?? '',
      nombre: this.addForm.value.nombre ?? ''
    }).subscribe(data =>{
      //this.displayItems;
      this.addForm.reset();
      this.addForm.patchValue({rolUsuario: this.rolEnum.cliente});  //despues de resetear el formulario asignamos el rol por defecto
      this.showFormCreate = "hidden";
      alert(`Usuario creado correctamente con ID: ${data._id}`);
    }, error =>{
      alert(error[0]);
    })
  }

  readUsuarios(){
    this.http.get(this.apiURL + '/usuario')
      .subscribe(data => {
        this.displayItems = data;
      })
  }

  // Borrar usuario introducido en la caja dandole al boton de borrar
  deleteUserFromButton(){
    const id = this.boxIdUser.value.userId;
    this.http.delete<any>(this.apiURL + '/usuario/' + id)
      .subscribe(data => {
        alert(data.message);
        this.displayItems;  //volvemos a mostrar la misma lista de usuarios que antes
      },error => {
        alert(error.error.message);
      })
  }
  // (DELETE) Eliminar una joya (botón con X)
  eliminarItem(_id: String){
    this.http.delete<any>(this.apiURL + '/usuario/' + _id )
      .subscribe(data => {
        alert(data.message);
        this.displayItems;  //volvemos a mostrar la misma lista de usuarios que antes
      }, error => {
        alert(error.error.message);
      })
  }

  // Funcion para el filtrado de los tipos de usuarios
  filtradoUsers(tipoUsuario: String){
    const id = this.boxIdUser.value.userId;
    this.http.get<any>(this.apiURL + '/getUserByTipo/' + tipoUsuario + '/' + id)
      .subscribe(data => {
        alert(data.message);
        this.displayItems = data.usuarios; //Mostramos todos los usuarios segun el tipo seleccionado
      },error => {
        alert(error.error.message);
      })
  }


}

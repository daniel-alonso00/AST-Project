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

  displayItems: any;  //Contiene el array de los usuarios

  showFormCreate = "hidden";

  //Constructor para el cliente HTTP
  constructor(private http: HttpClient) {}

  boxIdUser = new FormGroup({
    userId: new FormControl('')
  })
  ngOnInit(){
    this.readUsuarios();
  }

  //FormGroup para la creacion de usuarios
  addForm = new FormGroup({
    nombre: new FormControl(''),
    rolUsuario: new FormControl('cliente')
  });

  onSubmit() {
    console.log("id de usuario creado: "+this.boxIdUser.get('userId')?.value);
    this.http.post<any>(this.apiURL + '/usuario',{
      rolUsuario: this.addForm.value.rolUsuario ?? '',
      nombre: this.addForm.value.nombre ?? ''
    }).subscribe(data =>{
      this.readUsuarios();
      this.addForm.reset();
      this.addForm.patchValue({rolUsuario:'cliente'});  //despues de resetear el formulario asignamos el rol por defecto
      this.showFormCreate = "hidden";
      alert(`Usuario creado correctamente con ID: ${data._id}`);
    }, error =>{
      alert(error[0])
      return
    })
  }

  readUsuarios(){
    this.http.get(this.apiURL + '/usuario')
      .subscribe(data => {
        this.displayItems = data;
      })
  }

  // Borrar usuario introducido en la caja dandole al boton
  deleteUserFromButton(){
    const id = this.boxIdUser.value.userId;
    this.http.delete<any>(this.apiURL + '/usuario/' + id)
      .subscribe(data => {

        alert(data.message);
        this.readUsuarios();
      },error => {
        alert(error.error.message);
      })
  }
    // (DELETE) Eliminar una joya (botón con X)
    eliminarItem(_id: String){
      this.http.delete<any>(this.apiURL + '/usuario/' + _id )
        .subscribe(data => {
          alert(data.message);
          this.readUsuarios();
        }, error => {
          alert(error.error.message);
        })
    }

}

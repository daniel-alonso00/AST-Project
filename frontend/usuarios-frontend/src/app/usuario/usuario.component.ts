import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  apiURL = 'http://localhost:8060'

  displayItems: any;  //Contiene el array de los usuarios

  // tipoUser = {
  //   admin: true,
  //   estandar: false
  // }

  //Constructor para el cliente HTTP
  constructor(private http: HttpClient) {}

  //Metodo de inicio al recargar la pagina
  ngOnInit(){
    this.readUsuarios();
  }

  //FormGroup para la creacion de usuarios
  addForm = new FormGroup({
    nombre: new FormControl(''),
    rolUsuario: new FormControl('estandar')
  });

  onSubmit() {
    //console.log(this.rolDefault);
    this.http.post<any>(this.apiURL + '/usuario',{
      
      rolUsuario: this.addForm.value.rolUsuario ?? '',
      nombre: this.addForm.value.nombre ?? ''
    }).subscribe(data =>{
      this.readUsuarios();
      this.addForm.reset();

    }, error =>{
      alert(error[0])
      alert("Algo ha ocurrido")
      return
    })
  }

  readUsuarios(){
    this.http.get(this.apiURL + '/usuario')
      .subscribe(data => {
        this.displayItems = data;
      })
  }

}

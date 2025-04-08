import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  apiURL = 'http://localhost:8060'

  displayItems: any;  //Contiene el array de los usuarios

  rolDefault = false;  //definimos que por defecto el rol sea Estandar

  tipoUser = {
    admin: true,
    estandar: false
  }

  

  //Constructor para el cliente HTTP
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.readUsuarios();
  }

  
  addForm = new FormGroup({
    nombre: new FormGroup('')
  });

  onSubmit() {
    this.http.post<any>(this.apiURL + '/usuario',{
      rolUsuario: this.rolDefault ?? '',
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

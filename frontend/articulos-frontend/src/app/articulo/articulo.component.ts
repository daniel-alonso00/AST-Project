import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-articulo',
  imports: [ReactiveFormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
  apiURL = 'http://localhost:8080'

  tipoEnum = {
    anillo: 0,
    collar: 1,
    pendiente: 2,
    pulsera: 3
  }

  displayItems: any;            // Contiene el array de las joyas que se muestran por pantalla

  showForm = "hidden";          // Controla si el form para añadir está visible
  showUpdateForm = "hidden";    // Controla si el form para editar está visible

  // Estas tres variables contienen info sobre las joyas
  // que se modifica al mostrar los forms y se envía
  // en la request al backend
  updatingId = "";
  updatingTipo = 0;
  creatingTipo = 0;

  // Variables para hacer el update de un articulo y mostrarlas en el form
  nombreItem = "";
  precioItem = "";
  cantidadItem = "";

  searchForm = new FormGroup({      // Form de búsqueda por ID
    id: new FormControl('')
  });

  addForm = new FormGroup({         // Form para añadir Joya
    nombre: new FormControl(''),
    precio: new FormControl('', [Validators.required, Validators.min(0)]) ,   // Campos requeridos con una cantidad minima
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),  // Campos requeridos con una cantidad minima
    userId: new FormControl('')
  });

  userIdForm = new FormGroup({
    userId: new FormControl('')
  });

  updateForm = new FormGroup({      // Form para editar Joya
    nombre: new FormControl(''),
    precio: new FormControl('', [Validators.required, Validators.min(0)]) ,   // Campos requeridos con una cantidad minima
    cantidad: new FormControl('', [Validators.required, Validators.min(0)])   // Campos requeridos con una cantidad minima
  });

  constructor(private http: HttpClient) {}

  // Este método se llama al cargar la página
  ngOnInit() {

  }

  // --- Métodos CRUD (get, put, post, delete) ---

  // (GET) Leer todas las joyas del inventario
  readJoyas() {
    const userId = this.userIdForm.value.userId;
    console.log('UserID:', userId);

    this.http.get<any>(this.apiURL + '/inventario/' + userId)
      .subscribe(data => {
        alert(data.message);
        this.displayItems = data.joyas;
      },error => {
        alert(error.error.message)
      } );
  }

  // (PUT) Form para editar joya (botón con lápiz)
  onUpdateSubmit() {
    if (this.updateForm.valid){
      const userId = this.userIdForm.value.userId; 
      this.http.put<any>(this.apiURL + '/inventario/' + userId, {
        _id: this.updatingId,
        tipo: this.updatingTipo,
        nombre: this.updateForm.value.nombre ?? '',
        precio: this.updateForm.value.precio ?? '',
        cantidad: this.updateForm.value.cantidad ?? ''
      }).subscribe(data => {
        alert(data.message);
        //this.readJoyas(); //para que no se actulice la lista automaticamente
        this.showUpdateForm = 'hidden';
        this.updateForm.reset();
      }, error => {
        alert(error.error.message)
      })
    }else{
      alert("Los campos precio y cantidad tienen que ser mayores que cero.")
      return
    }

  }

  // (POST) Form para añadir nueva joya
  onSubmit() {
    console.log(this.userIdForm.value.userId);
    if(this.addForm.valid){
      const userId = this.userIdForm.value.userId;
      this.http.post<any>(this.apiURL + '/inventario/' + userId, {
        tipo: this.creatingTipo,
        nombre: this.addForm.value.nombre ?? '',
        precio: this.addForm.value.precio ?? '',
        cantidad: this.addForm.value.cantidad ?? ''
      }).subscribe(data => {
        alert(data.message);
        //this.readJoyas();   //no se si esto quitarlo por que si la intenta crear un cliente esto no funcionaria
        this.showForm = 'hidden';
        this.addForm.reset();
      }, error => {
        alert(error.error.message)
      })
    }else{
      alert("Los campos precio y cantidad tienen que ser mayores que cero.")
      return
    }

  }

  // (DELETE) Eliminar una joya (botón con X)
  eliminarItem(_id: String){
    const userId = this.userIdForm.value.userId;
    this.http.delete<any>(this.apiURL + '/inventario/' + userId + '/' + _id)
      .subscribe(data => {
        alert(data.message);
        //this.readJoyas(); //que se actualice dandole al boton, no automaticamente
      }, error => {
        alert(error.error.message);
      })
  }

  // --- Filtrados ---

  // Put para búsqueda por ID
  onSearchSubmit(){
    const userId = this.userIdForm.value.userId;
    this.http.get<any>(this.apiURL + '/getById/' + this.searchForm.value.id + '/' + userId)
      .subscribe(data => {
        alert(data.message);
        this.displayItems = [data.joya];
        console.log(data);
      }, error => {
        alert(error.error.message);
      })
  }

  // Put para filtrar por tipo de joya (anillo, collar, pendiente, pulsera)
  filterSelect(tipo: Number) {
    const userId = this.userIdForm.value.userId;
    if (tipo == 4) {
      this.readJoyas();
    } else {
      this.http.get<any>(this.apiURL + '/getTipo/' + tipo + '/' + userId)
        .subscribe(data => {
          alert(data.message);
          this.displayItems = data.joyas;
        }, error => {
          alert(error.error.message)
        })
    }
  }

  // --- ETC ---

  // Mostrar Form para actualizar
  handleShowUpdate(_id: string, tipo: number, nombre: string, precio: string, cantidad: string) {
    this.showUpdateForm = "visible";
    this.updatingId = _id;
    this.updatingTipo = tipo;

    // Asignamos a updateForm los valores sacados del articulo
    this.updateForm.patchValue({
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    });

  }
}
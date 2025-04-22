import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-compra',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  apiURL = 'http://localhost:8070';

  tipoEnum = {
    anillo: 0,
    collar: 1,
    pendiente: 2,
    pulsera: 3
  }

  shopping: boolean = true;
  displayCompras: any = [];
  displayItems: any = [];
  showForm = 'hidden';
  updateFormInfo = {
    _id: '',
    idArticulo: '',
    idCliente: '',
    cantidad: '',
    nombreCliente: '',
    direccion: ''
  };
  showUpdateForm = 'hidden';

  articleId = '';
  articleName = '';

  compraForm = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    nombreCliente: new FormControl('', [Validators.required, Validators.minLength(1)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  updateForm = new FormGroup({
    nombreCliente: new FormControl('', [Validators.required, Validators.minLength(1)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  articleFilterForm = new FormGroup({
    idArticulo: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  userIdForm = new FormGroup({
    userId: new FormControl('')
  })

  searchForm = new FormGroup({
    id: new FormControl('')
  })

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.shopping = true;
  }

  readJoyas() {
    if (this.userIdForm.value.userId) {
      this.http.get(this.apiURL + '/inventario/' + this.userIdForm.value.userId)
      .subscribe(data => {
        this.displayItems = data;
      }, error => {
        alert(error.error.message);
      });
    } else {
      alert("Introduce un ID de usuario.");
    }
  }

  onSubmit() {
    if (this.compraForm.valid && /^\d+$/.test(this.compraForm.value.cantidad as string) && this.compraForm.value.cantidad != '0') {
      this.http.post<any>(this.apiURL + '/compra', {
        idArticulo: this.articleId ?? '',
        idCliente: this.userIdForm.value.userId ?? '',
        cantidad: this.compraForm.value.cantidad ?? '',
        nombreCliente: this.compraForm.value.nombreCliente ?? '',
        direccion: this.compraForm.value.direccion ?? ''
      }).subscribe(res => {
        alert(res.message);
        this.compraForm.reset();
        this.readJoyas();
      }, error => {
        alert(error.error.message);
      })
    } else {
      alert("Debe introducir nombre, dirección y cantidad válidos.");
    }
  }

  onUpdateSubmit() {
    if (this.updateForm.valid) {
      this.http.put<any>(this.apiURL + '/compra', {
        idCompra: this.updateFormInfo._id,
        userId: this.userIdForm.value.userId ?? '',
        idCliente: this.updateFormInfo.idCliente,
        nombreCliente: this.updateForm.value.nombreCliente ?? '',
        direccion: this.updateForm.value.direccion ?? ''
      }).subscribe(data => {
        alert(data.message);
        this.showUpdateForm = 'hidden';
        this.showCompras();
      }, error => {
        alert(error.error.message);
      })
    } else {
      alert("Debe introducir un nombre y dirección no nulos.")
    }
  }

  onSearchSubmit(){
    if (this.userIdForm.value.userId) {
      this.http.get<any>(this.apiURL + '/getJoyaById/' + this.userIdForm.value.userId + '/' + this.searchForm.value.id)
      .subscribe(data => {
        this.displayItems = [data];
      }, error => {
        alert(error.error.message);
      })
    } else {
      alert("Introduce un ID de usuario");
    }
  }

  getComprasByArtId() {
    if (this.articleFilterForm.valid && this.userIdForm.value.userId) {
      this.http.get<any>(this.apiURL + '/getComprasByArtId/' + this.userIdForm.value.userId + '/' + this.articleFilterForm.value.idArticulo)
      .subscribe(data => {
        this.displayCompras = data;
        console.log(data);
      }, error => {
        alert(error.error.message);
      });
    } else {
      alert("Introduce un ID de artículo y un ID de usuario no nulos");
    }
  }

  deleteCompra(compra: any) {
    if (this.userIdForm.value.userId) {
      this.http.delete<any>(this.apiURL+'/compra/'+this.userIdForm.value.userId+'/'+compra.idCliente+'/'+compra._id)
      .subscribe(data => {
        alert(data.message);
        this.showCompras();
        this.readJoyas();
      }, error => {
        alert(error.error.message);
      });
    } else {
      alert("Introduce un ID de usuario.");
    }
  }

  showCompras() {
    this.shopping = false;
    this.showUpdateForm = 'hidden';
    this.updateFormInfo = {
      _id: '',
      idArticulo: '',
      idCliente: '',
      cantidad: '',
      nombreCliente: '',
      direccion: ''
    };
    this.http.get<any>(this.apiURL + '/getComprasById/' + this.userIdForm.value.userId)
    .subscribe(data => {
      this.displayCompras = data;
    }, error => {
      alert(error.error.message);
    });
  }

  showAddForm(item: any) {
    this.showForm= 'visible';
    this.articleId = item._id;
    this.articleName = item.nombre;
  }

  viewUpdateForm(compra: any) {
    this.updateFormInfo = compra;
    this.showUpdateForm = 'visible';
  }

  filterSelect(tipo: number) {
    if (this.userIdForm.value.userId) {
      if (tipo == 4) {
        this.readJoyas();
      } else {
        this.http.get<any>(this.apiURL + '/getInventarioTipo/' + this.userIdForm.value.userId + '/' + tipo)
          .subscribe(data => {
            this.displayItems = data;
          }, error => {
            alert(error.error.message)
          })
      }
    } else {
      alert("Introduce un ID de usuario");
    }
  }

  cantidadModify(n: number) {
    let cantidad = this.compraForm.value.cantidad ?? '';
    if (!/^\d+$/.test(cantidad)) { cantidad = "0" }
    let int_cantidad = parseInt(cantidad) + n;
    if (int_cantidad < 0) { return }

    this.compraForm.setValue({
      cantidad: int_cantidad.toString(),
      nombreCliente: this.compraForm.value.nombreCliente ?? '',
      direccion: this.compraForm.value.direccion ?? ''
    });
  }
}

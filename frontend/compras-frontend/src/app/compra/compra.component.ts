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
  articulosApiURL = 'http://localhost:8080';
  apiURL = 'http://localhost:8070';

  tipoEnum = {
    anillo: 0,
    collar: 1,
    pendiente: 2,
    pulsera: 3
  }

  shopping: boolean = true;
  displayCompras: any;
  displayItems: any;
  showForm = 'hidden';

  articleId = '';
  articleName = '';

  compraForm = new FormGroup({
    cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    nombreCliente: new FormControl('', [Validators.required, Validators.minLength(1)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(1)]),
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
    this.readJoyas();
  }

  readJoyas() {
    this.http.get(this.articulosApiURL + '/inventario')
    .subscribe(data => {
      this.displayItems = data;
    });
  }

  readCompras() {
    this.http.get(this.apiURL + "/compras")
    .subscribe(data => {
      this.displayCompras = data;
    })
  }

  onSubmit() {
    if (this.compraForm.valid && /^\d+$/.test(this.compraForm.value.cantidad as string)) {
      this.http.post<any>(this.apiURL + '/compra', {
        idArticulo: this.articleId ?? '',
        idCliente: this.userIdForm.value.userId ?? '',
        cantidad: this.compraForm.value.cantidad ?? '',
        nombreCliente: this.compraForm.value.nombreCliente ?? '',
        direccion: this.compraForm.value.direccion ?? ''
      }).subscribe(res => {
        alert(res.message);
        this.compraForm.reset();
      }, error => {
        alert(error.error.message);
      })
    } else {
      alert("Debe introducir nombre, dirección y cantidad válidos.");
    }
  }

  onSearchSubmit(){
    this.http.get<any>(this.articulosApiURL + '/getById/' + this.searchForm.value.id)
      .subscribe(data => {
        this.displayItems = [data.joya];
      }, error => {
        alert(error.error.message);
      })
  }

  showAddForm(item: any) {
    this.showForm= 'visible';
    this.articleId = item._id;
    this.articleName = item.nombre;
  }

  filterSelect(tipo: number) {
    if (tipo == 4) {
      this.readJoyas();
    } else {
      this.http.get<any>(this.articulosApiURL + '/getTipo/' + tipo)
        .subscribe(data => {
          this.displayItems = data.joyas;
        }, error => {
          alert(error.error.message)
        })
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

  showCompras() {
    this.shopping = false;
    this.readCompras();
  }
}

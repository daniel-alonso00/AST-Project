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

  displayItems: any;
  showForm = 'hidden';

  articleId = '';

  constructor(private http: HttpClient) {}

  compraForm = new FormGroup({
    cantidad: new FormControl(''),
    nombreCliente: new FormControl(''),
    direccion: new FormControl(''),
  })

  userIdForm = new FormGroup({
    userId: new FormControl('')
  })

  ngOnInit() {
    this.readJoyas();
  }

  readJoyas() {
    this.http.get(this.articulosApiURL + '/inventario')
      .subscribe(data => {
        this.displayItems = data;
      });
  }

  onSubmit() {
    this.http.post<any>(this.apiURL + '/compra', {
      idArticulo: this.articleId ?? '',
      idCliente: this.userIdForm.value.userId ?? '',
      cantidad: this.compraForm.value.cantidad ?? '',
      nombreCliente: this.compraForm.value.nombreCliente ?? '',
      direccion: this.compraForm.value.direccion ?? ''
    })
      .subscribe(res => {
        alert(res.message);
      }, error => {
        alert(error.error.message);
      })
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  items: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.http.get('http://127.0.0.1:8080/joya/anillo/all')
      .subscribe(data => {
        this.items = data;
      });
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  items: any[] = []; // Array to store API data

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.http.get<any[]>('http://localhost:8080/joya/anillo/all')
      .subscribe(
        (data) => {
          this.items = data;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}

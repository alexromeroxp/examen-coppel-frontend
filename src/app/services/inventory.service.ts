import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
 
  private baseUrl = 'http://localhost:8080/inventory';

  constructor(private http: HttpClient) { }

  getAllInventory() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  addInventory(inventoryItem: any) {
    return this.http.post(`${this.baseUrl}/add`, inventoryItem);
  }

  updateInventory(inventoryItem: any) {
    return this.http.put(`${this.baseUrl}/update`, inventoryItem);
  }

  deleteInventory(sku: string) {
    return this.http.delete(`${this.baseUrl}/delete/${sku}`);
  }

  getInventoryDetails(itemId: any) {
    return this.http.get(`${this.baseUrl}/${itemId}`);
  }
}

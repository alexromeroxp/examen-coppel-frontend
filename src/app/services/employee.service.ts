import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  addEmployee(employee: any) {
    return this.http.post(`${this.baseUrl}/add`, employee);
  }

  updateEmployee(employee: any) {
    return this.http.put(`${this.baseUrl}/update`, employee);
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.baseUrl}/delete/${employeeId}`);
  }

  getEmployeeDetails(employeeId: any) {
    return this.http.get(`${this.baseUrl}/${employeeId}`);
  }
}

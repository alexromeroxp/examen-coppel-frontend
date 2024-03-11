import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private baseUrl = 'http://localhost:8080/policy';  // Ajusta la URL base según tu configuración del backend

  constructor(private http: HttpClient) { }

  getAllPolicies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getPolicyByPolicyId(policyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${policyId}`);
  }

  addPolicy(policy: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, policy);
  }

  updatePolicy(policy: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, policy);
  }

  deletePolicy(policyId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${policyId}`);
  }
}

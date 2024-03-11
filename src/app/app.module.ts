import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './components/employee/employee.component';
import { MaterialModule } from './material/material.module';
import { EmployeeDetailComponent } from './components/employee/employee-detail/employee-detail.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryDetailComponent } from './components/inventory/inventory-detail/inventory-detail.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyDetailComponent } from './components/policy/policy-detail/policy-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    InventoryComponent,
    InventoryDetailComponent,
    PolicyComponent,
    PolicyDetailComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

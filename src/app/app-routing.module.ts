import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PolicyComponent } from './components/policy/policy.component';

const routes: Routes = [
  { path: 'empleados', component: EmployeeComponent },
  { path: 'polizas', component: PolicyComponent },
  { path: 'inventario', component: InventoryComponent },
  { path: '', redirectTo: "inicio", pathMatch: "full" },
  { path: 'inicio', component: InicioComponent },
  { path: '**', component:InicioComponent },





]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

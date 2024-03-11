import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PolicyService } from 'src/app/services/policy.service';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { InventoryService } from 'src/app/services/inventory.service';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  policies!: any[];
  inventoryItems!: any;
  employees!: any;
  policy: any = {};
  displayedColumns: string[] = ['idpoliza', 'cantidad', 'nombreEmpleado', 'nombreArticulo', 'actions'];

  constructor(private policyService: PolicyService, private snackBar: MatSnackBar, public dialog: MatDialog, private employeeService: EmployeeService, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.getPolicies();
    this.employeeService.getAllEmployees().subscribe(
      (data: any) => {
        this.employees = data.data.map((emp: any) => ({ ...emp, isEdit: false }));
      },
      (error) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );

    this.inventoryService.getAllInventory().subscribe(
      (data: any) => {
        this.inventoryItems = data.data.map((item: any) => ({ ...item, isEdit: false }));
      },
      (error: any) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );

  }

  getPolicies() {
    this.policyService.getAllPolicies().subscribe(
      (data: any) => {
        this.policies = data.data.map((policy: any) => ({ ...policy, isEdit: false }));
      },
      (error: any) => {
        console.error('Error fetching policies:', error);
      }
    );
  }

  addPolicy() {
    this.policyService.addPolicy(this.policy).subscribe(
      (data: any) => {
        this.getPolicies();
        this.snackBar.open(`Póliza agregada correctamente con ID: ${data.data.poliza.idpoliza}`, 'Cerrar', {
          duration: 3000
        });
      },
      (error: any) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  updatePolicy(policy: any): void {
    policy.isEdit = true;
  }

  doneEditing(policy: any): void {
    policy.isEdit = false;

    const request = {
      "quantity": policy.poliza.cantidad,
      "policyId": policy.poliza.idpoliza,
      "employeeId": policy.empleado.idEmpleado,
      "sku": policy.detalleArticulo.sku
    }

    this.policyService.updatePolicy(request).subscribe(
      (data: any) => {
        this.getPolicies();
        this.snackBar.open(data.data.message, 'Cerrar', {
          duration: 3000
        });
      },
      (error: any) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
    console.log(policy);
  }

  deletePolicy(policyId: number) {
    this.policyService.deletePolicy(policyId).subscribe(
      () => {
        this.getPolicies();
        this.snackBar.open(`Póliza eliminada correctamente con ID: ${policyId}`, 'Cerrar', {
          duration: 3000
        });
      },
      (error: any) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  detailPolicy(policy: any): void {
    this.policyService.getPolicyByPolicyId(policy.poliza.idpoliza).subscribe(
      (data: any) => {
        const dialogRef = this.dialog.open(PolicyDetailComponent, {
          width: '400px',
          data: data.data
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log('The dialog was closed');
        });
      },
      (error: any) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
  }
}

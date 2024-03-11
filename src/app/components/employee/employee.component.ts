import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees!: any[];
  employee: any = {};
  displayedColumns: string[] = ['employeeId', 'name', 'lastName', 'position', 'actions'];

  constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
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
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(
      (data: any) => {
        this.getEmployees();
        this.snackBar.open(`Empleado agregado correctamente con ID: ${data.data.employeeId}`, 'Cerrar', {
          duration: 3000
        });
      },
      (error) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
  }
  updateEmployee(employee: any): void {
    employee.isEdit = true;
  }

  doneEditing(employee: any): void {
    employee.isEdit = false;

    this.employeeService.updateEmployee(employee).subscribe(
      (data: any) => {
        this.getEmployees();
        this.snackBar.open(data.data.message, 'Cerrar', {
          duration: 3000
        });
      },
      (error) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
    console.log(employee);
  }

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        this.getEmployees();
        this.snackBar.open(`Empleado eliminado correctamente con ID: ${employeeId}`, 'Cerrar', {
          duration: 3000
        });
      },
      (error) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  detailEmployee(employeeId: any): void {
    this.employeeService.getEmployeeDetails(employeeId).subscribe(
      (data: any) => {
        const dialogRef = this.dialog.open(EmployeeDetailComponent, {
          width: '400px',
          data: data.data
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log('The dialog was closed');
        });
      },
      (error) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

}

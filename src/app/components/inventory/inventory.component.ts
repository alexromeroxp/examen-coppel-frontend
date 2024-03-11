import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  inventoryItems!: any[];
  inventoryItem: any = {};
  displayedColumns: string[] = ['sku', 'name', 'quantity', 'actions'];

  constructor(private inventoryService: InventoryService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getInventoryItems();
  }

  getInventoryItems() {
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

  addInventory() {
    this.inventoryService.addInventory(this.inventoryItem).subscribe(
      (data: any) => {
        this.getInventoryItems();
        this.snackBar.open(`Elemento del inventario agregado correctamente con ID: ${data.data.sku}`, 'Cerrar', {
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

  updateInventory(item: any): void {
    item.isEdit = true;
  }

  doneEditing(item: any): void {
    item.isEdit = false;

    this.inventoryService.updateInventory(item).subscribe(
      (data: any) => {
        this.getInventoryItems();
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
  }

  deleteInventory(sku: string) {
    this.inventoryService.deleteInventory(sku).subscribe(
      () => {
        this.getInventoryItems();
        this.snackBar.open(`Elemento del inventario eliminado correctamente con SKU: ${sku}`, 'Cerrar', {
          duration: 3000
        });
      },
      (error: any) => {
        this.snackBar.open(`${error.error.data.message}`, 'Cerrar', {
          duration: 3000
        });      }
    );
  }

  detailInventory(itemId: any): void {
    this.inventoryService.getInventoryDetails(itemId).subscribe(
      (data: any) => {
        const dialogRef = this.dialog.open(InventoryDetailComponent, {
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
        });      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Item } from 'src/app/shared/models/item';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items: Item[];
  itemSelected: Item;
  loading: boolean;

  constructor(private is: ItemsService,
              private dialog: MatDialog,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getItems();
    this.is.updateForm.next(null);
  }

  getItems(): void {
    this.is.getItems()
    .subscribe(res => {
      this.items = res;
    });
  }

  checkItem(item: Item): void {
    this.loading = true;
    setTimeout(() => {
      this.itemSelected = item;
      this.is.itemSelected.next(item);
      this.loading = false;
    }, 300);
  }

  update(selectedItem: Item): void {
    this.router.navigate(['']);
    this.is.updateForm.next(selectedItem);
  }

  delete(selectedItem: Item): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { name: selectedItem.name, status: 'delete' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.loading = true
          setTimeout(() => {
            this.toastr.success('Form has been deleted.', 'Success!');
            this.is.deleteItem(selectedItem);
            this.loading = false;
          }, 300);
        }
      });
  }

}

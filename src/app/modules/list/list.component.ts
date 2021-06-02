import { Component, OnInit } from '@angular/core';
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

  constructor(private is: ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.is.getItems()
    .subscribe(res => {
      console.log(res);
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

}

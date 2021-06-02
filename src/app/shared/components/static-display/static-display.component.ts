import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-static-display',
  templateUrl: './static-display.component.html',
  styleUrls: ['./static-display.component.scss']
})
export class StaticDisplayComponent implements OnInit {

  item: Item;
  border: string;

  constructor(private is: ItemsService) { }

  ngOnInit(): void {
    this.is.itemSelected
      .subscribe(val => {
        this.item = val;
        console.log(val);
      });
    console.log('static data: ', this.item);
    this.border = `${this.item.borderWidth}px ${this.item.borderStyle} ${this.item.borderColor}`;
    console.log(this.border);
  }

}

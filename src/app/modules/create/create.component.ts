import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/shared/services/items.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  itemsLength: number;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private is: ItemsService) { }

  ngOnInit(): void {
    this.buildForm();
    this.is.getItems()
      .subscribe(res => {
        console.log(res);
        this.itemsLength = res.length;
      });
  }

  buildForm(): void {
    this.form = this.fb.group({
      backgroundColor: [null, Validators.required],
      overallPadding: [null, Validators.required],
      borderColor: [null, Validators.required],
      overallMargin: [null, Validators.required],
      borderWidth: [null, Validators.required],
      borderStyle: [null, Validators.required],
      name: [null]
    });
  }

  submit(): void {
    const payload = this.form.getRawValue();
    payload.name = 'form ' + (this.itemsLength + 1);
    console.log(payload);

    if (this.form.valid) {
      this.is.addItem(payload);
      this.loading = true;
    }

    setTimeout(() => {
      this.loading = false;
      this.form.reset();
    }, 300);
  }

}

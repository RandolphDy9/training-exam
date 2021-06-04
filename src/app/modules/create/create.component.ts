import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  updateMode: boolean;
  updateId: string;

  constructor(private fb: FormBuilder,
              private is: ItemsService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.buildForm();
    this.is.getItems()
      .subscribe(res => {
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
      borderStyle: [null, Validators.required]
    });

    this.is.updateForm.subscribe(res => {
      if (res) {
        this.updateMode = true;
        this.updateId = res.id;
        this.form.patchValue({
          backgroundColor: res.backgroundColor,
          overallPadding: res.overallPadding,
          borderColor: res.borderColor,
          overallMargin: res.overallMargin,
          borderWidth: res.borderWidth,
          borderStyle: res.borderStyle,
          name: res.name
        });
      }
    });
  }

  submit(): void {
    const payload = this.form.getRawValue();

    if (this.form.valid) {
      if (this.updateMode) {
        const data = { id: this.updateId, ...payload };
        this.is.updateItem(data);
      } else {
        payload.name = 'form ' + (this.itemsLength + 1);
        this.is.addItem(payload);
      }
      this.loading = true;
    }

    setTimeout(() => {
      this.loading = false;
      this.toastr.success(`Form has been ${ this.updateMode ? 'updated' : 'added'}.`, 'Success!');
      this.form.reset();
    }, 300);
  }

}

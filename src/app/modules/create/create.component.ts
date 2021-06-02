import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
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
  }

  submit(): void {
    const payload = this.form.getRawValue();
    console.log(payload);

    this.form.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: false }
    }
  ]
})
export class MerchantsComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      transflowId: ['', Validators.required],
      merchantName: ['', Validators.required],
      merchantEmail: ['', [Validators.required, Validators.email]],
      merchantPhoneNumber: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      branchName: ['', Validators.required],
      branchCode: ['', [Validators.required,Validators.maxLength(7)]],
      branchLocation: ['', Validators.required],
      branchEmail: ['', [Validators.required,Validators.email]],
      branchPhoneNumber: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required,Validators.email]],
      userPhoneNumber: ['', Validators.required]
    });
  }
}

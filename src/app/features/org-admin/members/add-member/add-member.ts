import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { IAddMenber, IUpdateOrg } from '../../../../core/interface/organization.interface';
import { OrganizationService } from '../../../../services/organization/organization.service';

@Component({
  selector: 'app-add-member',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, CommonModule],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  public config = inject(DynamicDialogConfig);
  private orgService = inject(OrganizationService);

  orgRoles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Member', value: 'member' },
    { label: 'Teacher', value: 'teacher' },
  ];
  statuses = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  addMemberForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(this.orgRoles[1].value, Validators.required),
    status: new FormControl(this.statuses[0].value),
  });

  ngOnInit(): void {
    if (this.config.data?.member) {
      // Map member data to the form
      // IMember has org_role and user_email, and status
      this.addMemberForm.patchValue({
        email: this.config.data.member.user_email,
        role: this.config.data.member.org_role,
        status: this.config.data.member.status,
      });

      // email and name may not be changeable on edit, or name isn't present
      this.addMemberForm.get('email')?.disable();
      this.addMemberForm.get('name')?.disable();
    }
  }

  close() {
    this.dialogRef.close();
  }

  addMember() {
    const payload: IAddMenber = {
      name: this.addMemberForm.get('name')?.value || '',
      email: this.addMemberForm.get('email')?.value || '',
      role: this.addMemberForm.get('role')?.value || '',
    };
    this.orgService.addMember(this.config.data.orgId, payload).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateMember() {
    // In db.json or interface, IUpdateMember takes `role` and `status` - wait, the method signature in organization.service.ts uses IUpdateOrg. That must be a typo in the typescript service. Let me actually pass the role and status.
    // Wait I'll pass an object that matches the structural need.
    const payload: any = {
      role: this.addMemberForm.get('role')?.value,
      status: this.addMemberForm.get('status')?.value,
    };

    this.orgService
      .updateMember(this.config.data.orgId, this.config.data.member.id, payload as IUpdateOrg)
      .subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}

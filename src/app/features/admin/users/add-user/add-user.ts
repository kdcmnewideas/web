import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PlatformManagementService } from '../../../../services/platform-management/platform-management.service';
import { ICreateUser, IPlatformUser } from '../../../../core/interface/platform-users.interface';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  public config = inject(DynamicDialogConfig);
  private platformService = inject(PlatformManagementService);
  platformRoles = [
    { label: 'Super Admin', value: 'super_admin' },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];
  statuses = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  addUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    platform_role: new FormControl(this.platformRoles[2].value, Validators.required),
    status: new FormControl(this.statuses[0].value, Validators.required),
  });

  ngOnInit(): void {
    this.addUserForm.patchValue(this.config.data);
  }

  close() {
    this.dialogRef.close();
  }

  addUser() {
    this.platformService.addUser(this.addUserForm.value as ICreateUser).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateUser() {
    this.platformService.updateUser(this.addUserForm.value as IPlatformUser).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClassesService } from '../../../../services/classes/classes.service';
import { ICreateClass, IUpdateClass } from '../../../../core/interface/classes.interface';
import { ICourse } from '../../../../core/interface/courses.interface';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    CheckboxModule,
  ],
  templateUrl: './add-class.html',
  styleUrl: './add-class.css',
})
export class AddClass implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private classesService = inject(ClassesService);

  isEdit = false;
  courses: ICourse[] = [];
  userDetails: any;

  courseOptions: any[] = [];

  classForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    join_code: new FormControl('', [Validators.required]),
    course_id: new FormControl('', [Validators.required]),
    allow_join_requests: new FormControl(true),
    is_active: new FormControl(true),
  });

  ngOnInit() {
    this.userDetails = this.config.data.userDetails;
    this.courses = this.config.data.courses || [];
    this.courseOptions = this.courses.map(c => ({ label: c.name, value: c.id }));

    if (this.config.data.class) {
      this.isEdit = true;
      const cls = this.config.data.class;
      this.classForm.patchValue({
        name: cls.name,
        join_code: cls.join_code,
        course_id: cls.course_id,
        allow_join_requests: cls.allow_join_requests,
        is_active: cls.is_active
      });
      this.classForm.get('join_code')?.disable();
      this.classForm.get('course_id')?.disable();
    }
  }

  onSave() {
    if (this.classForm.invalid) return;

    if (this.isEdit) {
      this.updateClass();
    } else {
      this.createClass();
    }
  }

  private createClass() {
    const rawValue = this.classForm.getRawValue();
    const payload: ICreateClass = {
      name: rawValue.name!,
      join_code: rawValue.join_code!,
      course_id: rawValue.course_id!,
      allow_join_requests: !!rawValue.allow_join_requests,
      org_id: this.userDetails.org_id
    };

    this.classesService.createClass(payload, this.userDetails).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (err) => console.error('Create error', err)
    });
  }

  private updateClass() {
    const rawValue = this.classForm.getRawValue();
    const payload: IUpdateClass = {
      name: rawValue.name!,
      course_id: rawValue.course_id!,
      is_active: !!rawValue.is_active,
      is_published: true, // defaulting
      is_archived: false, // defaulting
    };

    this.classesService.updateClass(this.config.data.class.id, payload, this.userDetails).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (err) => console.error('Update error', err)
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

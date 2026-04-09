import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ICreateCourse, IUpdateCourse } from '../../../../core/interface/courses.interface';
import { CoursesService } from '../../../../services/courses/courses.service';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, CommonModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  public config = inject(DynamicDialogConfig);
  private courseService = inject(CoursesService);

  boardOptions: any[] = [];
  statuses = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  addCourseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    board_id: new FormControl('', Validators.required),
    is_active: new FormControl(true),
  });

  ngOnInit(): void {
    if (this.config.data?.boards) {
      this.boardOptions = this.config.data.boards;
    }

    if (this.config.data?.course) {
      this.addCourseForm.patchValue({
        name: this.config.data.course.name,
        code: this.config.data.course.code,
        board_id: this.config.data.course.board_id,
        is_active: this.config.data.course.is_active,
      });

      // Code and Board cannot be edited after creation logically per typical schema,
      // but strictly adhering to IUpdateCourse which only updates `name` and `is_active`
      this.addCourseForm.get('code')?.disable();
      this.addCourseForm.get('board_id')?.disable();
    }
  }

  close() {
    this.dialogRef.close();
  }

  addCourse() {
    const payload: ICreateCourse = {
      name: this.addCourseForm.get('name')?.value || '',
      code: this.addCourseForm.get('code')?.value || '',
      board_id: this.addCourseForm.get('board_id')?.value || '',
    };

    this.courseService.createCourse(payload).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateCourse() {
    const payload: IUpdateCourse = {
      name: this.addCourseForm.get('name')?.value || '',
      is_active: this.addCourseForm.get('is_active')?.value ?? true,
    };

    const courseId = this.config.data.course.id;

    this.courseService.updateCourse(courseId, payload).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

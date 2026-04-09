import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SectionService } from '../../../../services/section/section.service';
import { ICreateSection, ISection } from '../../../../core/interface/section.interface';

@Component({
  selector: 'app-add-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './add-section.html',
  styleUrl: './add-section.css',
})
export class AddSection implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private sectionService = inject(SectionService);

  isEdit = false;
  userDetails: any;
  class: any;

  sectionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    join_code: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.userDetails = this.config.data.userDetails;
    this.class = this.config.data.class;

    if (this.config.data.section) {
      this.isEdit = true;
      const sec = this.config.data.section;
      this.sectionForm.patchValue({
        name: sec.name,
        join_code: sec.join_code,
      });
      this.sectionForm.get('join_code')?.disable();
    }
  }

  onSave() {
    if (this.sectionForm.invalid) return;

    if (this.isEdit) {
      this.updateSection();
    } else {
      this.createSection();
    }
  }

  private createSection() {
    const rawValue = this.sectionForm.getRawValue();
    const payload: ICreateSection = {
      name: rawValue.name!,
      join_code: rawValue.join_code!,
      course_id: this.class.course_id,
      class_id: this.class.id,
    };

    this.sectionService.createSection(payload, this.userDetails).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (err) => console.error('Create section error', err),
    });
  }

  private updateSection() {
    const rawValue = this.sectionForm.getRawValue();
    // Service expects ISection, let's merge with existing data
    const payload: ISection = {
      ...this.config.data.section,
      name: rawValue.name!,
      join_code: rawValue.join_code || this.config.data.section.join_code,
    };

    this.sectionService
      .updateSection(this.config.data.section.id, payload, this.userDetails)
      .subscribe({
        next: (res) => this.dialogRef.close(res),
        error: (err) => console.error('Update section error', err),
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

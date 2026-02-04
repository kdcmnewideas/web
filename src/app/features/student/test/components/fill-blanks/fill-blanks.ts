import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-fill-blanks',
  imports: [],
  templateUrl: './fill-blanks.html',
  styleUrl: './fill-blanks.css',
})
export class FillBlanks {
  blankText = input<string>('');
  answer = input<string[] | undefined>(undefined);
  setAnswer = output<string[]>();
  parts = computed(() => this.blankText()?.split('[blank]') || []);
  userBlanks = (() => this.answer() || Array(this.parts().length - 1).fill(''));

  updateBlank = (val: string, index: number) => {
    const next = [...this.userBlanks()];
    next[index] = val;
    this.setAnswer.emit(next);
  };
}

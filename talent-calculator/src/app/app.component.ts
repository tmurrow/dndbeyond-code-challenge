import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'talent-calculator';
  totalPoints = 6;
  currentPoints = this.totalPoints;
  talentPath = ['stack', 'utensils', 'cake', 'crown', 'ship', 'scuba', 'bolt', 'skull'];
  talentPathSelected = [false, false, false, false, false, false, false, false];

  ngOnInit() {

  }

  isSelected(rune: string) {
    return this.talentPathSelected[this.talentPath.indexOf(rune)];
  }

  select(rune: string) {
    if (this.currentPoints > 0 && this.talentPathSelected[this.talentPath.indexOf(rune)] == false) {
        this.talentPathSelected[this.talentPath.indexOf(rune)] = true;
        this.currentPoints = this.currentPoints - 1;
    }
  }

  deselect(rune: string) {
    this.talentPathSelected[this.talentPath.indexOf(rune)] = false;
    if (this.currentPoints < this.totalPoints) {
      this.currentPoints = this.currentPoints + 1;
    }
    return false;
  }
}

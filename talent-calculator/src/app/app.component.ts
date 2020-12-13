import { Component } from '@angular/core';
import { Rune } from './models/rune';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'talent-calculator';
  totalPoints = 6;
  currentPoints = this.totalPoints;
  runeList = [];
  runePath1 = [];
  runePath2 = [];

  ngOnInit() {
    this.createRunes();
    this.runePath1 = this.runeList.filter(rune => rune.talentPath === 1);
    this.runePath2 = this.runeList.filter(rune => rune.talentPath === 2);
  }

  isSelected(runeName: string) {
    return this.getRune(runeName).selected;
  }

  select(runeName: string) {
    let rune: Rune = this.getRune(runeName);
    let previousRune: Rune = this.getRune(rune.previousRune);

    if (this.currentPoints > 0 && !rune.selected && (previousRune === undefined || previousRune.selected )) {
      rune.selected = true;
      this.setRune(rune);
      this.currentPoints -= rune.cost;
    }
  }

  deselect(runeName: string) {
    let rune: Rune = this.getRune(runeName);
    let nextRune: Rune = this.getRune(rune.nextRune);
    if (rune.selected && (nextRune === undefined || !nextRune.selected)) {
      rune.selected = false;
      this.setRune(rune);
      if (this.currentPoints < this.totalPoints) {
        this.currentPoints += rune.cost;
      }
    }
    return false;
  }

  createRunes() {
    this.runeList.push(new Rune('stack', 1, '', 'utensils'));
    this.runeList.push(new Rune('utensils', 1, 'stack', 'cake'));
    this.runeList.push(new Rune('cake', 1, 'utensils', 'crown'));
    this.runeList.push(new Rune('crown', 1, 'cake', ''));

    this.runeList.push(new Rune('ship', 2, '', 'scuba'));
    this.runeList.push(new Rune('scuba', 2, 'ship', 'bolt'));
    this.runeList.push(new Rune('bolt', 2, 'scuba', 'skull'));
    this.runeList.push(new Rune('skull', 2, 'bolt', ''));
    if (localStorage.getItem('runeList') === null) {
      localStorage.setItem('runeList', JSON.stringify(this.runeList));
    }
  }

  getRune(name: string) {
    return this.runeList.find(r => r.name === name);
  }

  setRune(updatedRune: Rune) {
    this.runeList[this.runeList.indexOf(updatedRune)] = updatedRune;
    localStorage.setItem('runeList', JSON.stringify(this.runeList));
  }
}

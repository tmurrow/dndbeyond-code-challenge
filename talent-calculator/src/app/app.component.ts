import { Component } from '@angular/core';
import { Talent } from './models/talent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'talent-calculator';
  totalPoints = 6;
  currentPoints = this.totalPoints;
  talentList = [];
  talentPath1 = [];
  talentPath2 = [];

  ngOnInit() {
    this.createTalents();
    this.talentPath1 = this.talentList.filter(talent => talent.talentPath === 1);
    this.talentPath2 = this.talentList.filter(talent => talent.talentPath === 2);
  }

  isSelected(talentName: string) {
    return this.getTalent(talentName).selected;
  }

  select(talentName: string) {
    let talent: Talent = this.getTalent(talentName);
    let previousTalent: Talent = this.getTalent(talent.previousTalent);

    if (this.currentPoints > 0 && !talent.selected && (previousTalent === undefined || previousTalent.selected )) {
      talent.selected = true;
      this.setTalent(talent);
      this.currentPoints -= talent.cost;
    }
  }

  deselect(talentName: string) {
    let talent: Talent = this.getTalent(talentName);
    let nextTalent: Talent = this.getTalent(talent.nextTalent);
    if (talent.selected && (nextTalent === undefined || !nextTalent.selected)) {
      talent.selected = false;
      this.setTalent(talent);
      if (this.currentPoints < this.totalPoints) {
        this.currentPoints += talent.cost;
      }
    }
    return false;
  }

  createTalents() {
    this.talentList.push(new Talent('stack', 1, '', 'utensils'));
    this.talentList.push(new Talent('utensils', 1, 'stack', 'cake'));
    this.talentList.push(new Talent('cake', 1, 'utensils', 'crown'));
    this.talentList.push(new Talent('crown', 1, 'cake', ''));

    this.talentList.push(new Talent('ship', 2, '', 'scuba'));
    this.talentList.push(new Talent('scuba', 2, 'ship', 'bolt'));
    this.talentList.push(new Talent('bolt', 2, 'scuba', 'skull'));
    this.talentList.push(new Talent('skull', 2, 'bolt', ''));
    if (localStorage.getItem('talentList') === null) {
      localStorage.setItem('talentList', JSON.stringify(this.talentList));
    }
  }

  getTalent(name: string) {
    return this.talentList.find(r => r.name === name);
  }

  setTalent(updatedTalent: Talent) {
    this.talentList[this.talentList.indexOf(updatedTalent)] = updatedTalent;
    localStorage.setItem('talentList', JSON.stringify(this.talentList));
  }
}

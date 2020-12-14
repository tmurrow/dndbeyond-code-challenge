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
  spentPoints = 0;
  talentList = [];
  talentPath1 = [];
  talentPath2 = [];

  ngOnInit() {
    this.getTalentList();
    // Separate the main list into a list for each path
    this.talentPath1 = this.talentList.filter(talent => talent.talentPath === 1);
    this.talentPath2 = this.talentList.filter(talent => talent.talentPath === 2);
  }

  // Return if the given talent is selected
  isSelected(talentName: string) {
    return this.getTalent(talentName).selected;
  }

  // Get the talent to select. If there are enough points to buy the talent, if it's not already selected,
  // and if the previous talent is selected, then select the talent, spend the points, and update the list.
  select(talentName: string) {
    let talent: Talent = this.getTalent(talentName);
    let previousTalent: Talent = this.getTalent(talent.previousTalent);

    if (this.spentPoints < this.totalPoints && (this.totalPoints-this.spentPoints) >= talent.cost && !talent.selected && (previousTalent === undefined || previousTalent.selected )) {
      talent.selected = true;
      this.spentPoints += talent.cost;
      this.updateTalent(talent);
    }
  }

  // Get the talent to deselect, if it's selected and the next talent in the path isn't selected,
  // deselect it, update the list, and gain the spent points back.
  deselect(talentName: string) {
    let talent: Talent = this.getTalent(talentName);
    let nextTalent: Talent = this.getTalent(talent.nextTalent);
    if (talent.selected && (nextTalent === undefined || !nextTalent.selected)) {
      talent.selected = false;
      this.spentPoints -= talent.cost;
      this.updateTalent(talent);
    }
    return false;
  }

  // Get a talent from the list by name
  getTalent(name: string) {
    return this.talentList.find(r => r.name === name);
  }

  // Update a talent in the list
  updateTalent(updatedTalent: Talent) {
    this.talentList[this.talentList.indexOf(updatedTalent)] = updatedTalent;
    localStorage.setItem('talentList', JSON.stringify(this.talentList));
    localStorage.setItem('spentPoints', JSON.stringify(this.spentPoints));
  }

  // Load the talent list from localStorage if it exists, if not create a new list and set it in localStorage
  getTalentList() {
    if (localStorage.getItem('talentList') !== null) {
      this.talentList = JSON.parse(localStorage.getItem('talentList'));
      this.spentPoints = JSON.parse(localStorage.getItem('spentPoints'));
    } else {
      this.createTalents();
      localStorage.setItem('talentList', JSON.stringify(this.talentList));
    }
  }

  // Create the initial list of talents
  createTalents() {
    this.talentList.push(new Talent('stack', 1, '', 'utensils'));
    this.talentList.push(new Talent('utensils', 1, 'stack', 'cake'));
    this.talentList.push(new Talent('cake', 1, 'utensils', 'crown'));
    this.talentList.push(new Talent('crown', 1, 'cake', ''));

    this.talentList.push(new Talent('ship', 2, '', 'scuba'));
    this.talentList.push(new Talent('scuba', 2, 'ship', 'bolt'));
    this.talentList.push(new Talent('bolt', 2, 'scuba', 'skull'));
    this.talentList.push(new Talent('skull', 2, 'bolt', ''));
  }
}

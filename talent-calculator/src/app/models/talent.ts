export class Talent {
  name: string;
  cost: number;
  selected: boolean;
  talentPath: number;
  previousTalent: string;
  nextTalent: string;

  constructor(name: string, talentPath: number, previousTalent: string, nextTalent: string) {
    this.name = name;
    this.cost = 1;
    this.selected = false;
    this.talentPath = talentPath;
    this.previousTalent = previousTalent;
    this.nextTalent = nextTalent;
  }
}

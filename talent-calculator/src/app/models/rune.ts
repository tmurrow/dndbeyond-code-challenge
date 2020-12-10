export class Rune {
  className: string;
  cost: number;
  selected: boolean;
  talentPath: number;
  previousRune: string;
  nextRune: string;

  constructor(className: string, talentPath: number, previousRune: string, nextRune: string) {
    this.className = className;
    this.cost = 1;
    this.selected = false;
    this.talentPath = talentPath;
    this.previousRune = previousRune;
    this.nextRune = nextRune;
  }
}

export class Rune {
  name: string;
  cost: number;
  selected: boolean;
  talentPath: number;
  previousRune: string;
  nextRune: string;

  constructor(name: string, talentPath: number, previousRune: string, nextRune: string) {
    this.name = name;
    this.cost = 1;
    this.selected = false;
    this.talentPath = talentPath;
    this.previousRune = previousRune;
    this.nextRune = nextRune;
  }
}

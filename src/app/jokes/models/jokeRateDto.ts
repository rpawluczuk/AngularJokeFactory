export class JokeRateDto {

  jokeId: number;
  rate: number;

  constructor(jokeId: number, rate: number) {
    this.jokeId = jokeId;
    this.rate = rate;
  }
}

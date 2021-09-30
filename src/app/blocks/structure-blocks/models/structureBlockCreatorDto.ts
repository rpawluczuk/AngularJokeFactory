export class StructureBlockCreatorDto {

  id: number;
  title: string;
  description: string;
  position: number;

  constructor(position: number) {
    this.position = position;
  }
}

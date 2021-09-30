import {StructureBlockCreatorDto} from '../../blocks/structure-blocks/models/structureBlockCreatorDto';

export class StructureCreatorDto {

  id: number;
  name: string;
  description: string;
  structureBlockCreatorDtoList: StructureBlockCreatorDto[];
  dateCreated: string;
}

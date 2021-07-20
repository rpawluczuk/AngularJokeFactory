import {StructureBlock} from '../../blocks/structure-blocks/models/structure-block';

export interface Structure {
  id: number;
  name: string;
  description: string;
  blockScheme: StructureBlock[];
  lastUpdated: string;
  dateCreated: string;
}

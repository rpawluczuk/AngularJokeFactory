import {Block} from '../../blocks/structure-blocks/models/block';

export interface Structure {
  id: number;
  name: string;
  description: string;
  blockScheme: Block[];
  lastUpdated: string;
  dateCreated: string;
}

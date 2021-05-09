import {Block} from './block';

export interface Structure {
  id: number;
  name: string;
  description: string;
  blockScheme: Block[];
  lastUpdated: string;
  dateCreated: string;
}

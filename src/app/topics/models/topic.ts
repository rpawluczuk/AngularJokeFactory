export class Topic {
  id: number;
  name: string;
  lastUpdated: string;
  dateCreated: string;
  children: Topic[] = [];
  parents: Topic[] = [];
}

import { Column } from "./column.model";

export class TodoBoard1{
  constructor(public names: string,
 public columns: Column[]) {}
}

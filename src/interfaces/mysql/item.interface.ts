import { IDrop } from "./drop.interface";

export interface IItem {
  class: string;
  name: string;
  icon: string;
  mapTier: number;
  count: number;
  unlocked: boolean;
  unlockable: number;
  drops: Array<IDrop>;
}

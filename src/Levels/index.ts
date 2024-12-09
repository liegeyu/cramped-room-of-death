import level1 from './level1';
import level2 from './level2';
import level3 from './level3';
import level4 from './level4';
import { TILE_TYPE_ENUM } from '@/Enums';

export interface ITile {
  src: number | null;
  type: TILE_TYPE_ENUM | null;
}

export interface ILevel {
  mapInfo: Array<Array<ITile>>;
}

const levels: Record<string, ILevel> = {
  level1,
  level2,
  level3,
  level4,
};

export default levels;

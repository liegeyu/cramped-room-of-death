import { ITile } from '@/Levels';
import Singleton from '@/Base/singleton';

export default class DataManager extends Singleton {
  static get instance() {
    return super.getInstance<DataManager>();
  }

  levelIndex: number = 1; // 当前关卡索引
  mapInfo: Array<Array<ITile>>;
  mapRowCount: number;
  mapColCount: number;

  reset() {
    this.mapInfo = [];
    this.mapRowCount = 0;
    this.mapColCount = 0;
  }
}

import { Component } from '@eva/eva.js';
import DataManager from '@/Runtime/DataManager';
import Tile from '../../Tile';
import { randomByRange } from '@/utils';

export class TileMapManager extends Component {
  static componentName = 'TileMapManager'; // 设置组件的名字

  init() {
    this.initTile();
  }

  // 初始化地图
  initTile() {
    const { mapInfo } = DataManager.instance;

    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i];
      for (let j = 0; j < column.length; j++) {
        const tileObj = column[j];

        if (tileObj.src === null || tileObj.type === null) {
          continue;
        }

        let number = tileObj.src;
        if ((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0) {
          number += randomByRange(0, 4);
        }

        const spriteStr = `bg (${number}).png`;

        // 地图元素
        const tileItemGameObj = Tile(spriteStr, i, j);

        this.gameObject.addChild(tileItemGameObj);
      }
    }
  }
}

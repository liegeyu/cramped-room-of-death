import { Component } from '@eva/eva.js';
import TileMap from '../GameObjects/TileMap';
import Player from '../GameObjects/Player';
import levels from '@/Levels';
import DataManager from '@/Runtime/DataManager';
import EventManager from '@/Runtime/EventManager';
import { TILE_HEIGHT, TILE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants';
import { EVENT_ENUM } from '@/Enums';

export class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  init() {
    EventManager.instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this);
    this.initLevel();
  }

  // 初始化关卡
  initLevel() {
    const { levelIndex } = DataManager.instance;
    const level = levels[`level${levelIndex}`];
    DataManager.instance.mapInfo = level.mapInfo; // 获取地图信息
    DataManager.instance.mapRowCount = level.mapInfo.length;
    DataManager.instance.mapColCount = level.mapInfo[0].length;

    this.generateTileMap();
    this.generatePlayer();
  }

  // 清空关卡
  clearLevel() {
    // 获取当前游戏对象上所有子对象
    this.gameObject.transform.children.forEach(childGameObj => {
      childGameObj.gameObject.destroy();
    });

    DataManager.instance.reset(); // 重置数据
  }

  // 生成地图
  generateTileMap() {
    const tileMapGameObj = TileMap();
    this.gameObject.addChild(tileMapGameObj);
    this.adaptPos();
  }

  // 生成玩家
  generatePlayer() {
    const playerGameObj = Player();
    this.gameObject.addChild(playerGameObj);
  }

  // 地图适配屏幕
  adaptPos() {
    const { mapColCount, mapRowCount } = DataManager.instance;
    const disX = (SCREEN_WIDTH - TILE_WIDTH * mapRowCount) / 2;
    const disY = (SCREEN_HEIGHT - TILE_HEIGHT * mapColCount) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }

  // 下一关
  nextLevel() {
    this.clearLevel();
    DataManager.instance.levelIndex++;
    this.initLevel();
  }
}

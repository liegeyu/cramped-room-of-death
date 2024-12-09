import { Scene, GameObject } from '@eva/eva.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants';
import BackgroundColor from './GameObjects/BackgroundColor';
import Footer from './GameObjects/Footer';
import Controller from './GameObjects/Controller';
// import TileMap from './GameObjects/TileMap';
import { BattleManager } from './Scripts';

const BattleScene = () => {
  const scene = new Scene('BattleScene', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });

  // 添加游戏对象 - 背景
  const backgroundColorGameObj = BackgroundColor();
  scene.addChild(backgroundColorGameObj); // 添加

  // 添加游戏对象 - 按钮
  const ControllerGameObj = Controller();
  scene.addChild(ControllerGameObj);

  // 添加游戏对象 - 底部
  const footerGameObj = Footer();
  scene.addChild(footerGameObj);

  // // 添加游戏对象 - 地图
  // const tileMapGameObj = TileMap();
  // scene.addChild(tileMapGameObj);
  const stage = new GameObject('stage', {});

  stage.addComponent(new BattleManager());
  scene.addChild(stage);

  return scene;
};

export default BattleScene;

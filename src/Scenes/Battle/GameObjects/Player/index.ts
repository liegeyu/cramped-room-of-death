import { GameObject } from '@eva/eva.js';
import { ENTITY_HEIGHT, ENTITY_WIDTH } from '@/constants';
import { PlayerManager } from './Scripts/PlayerManager';

const Player = () => {
  const player = new GameObject('player', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    },
  });

  // 添加脚本
  player.addComponent(new PlayerManager());

  return player;
};

export default Player;

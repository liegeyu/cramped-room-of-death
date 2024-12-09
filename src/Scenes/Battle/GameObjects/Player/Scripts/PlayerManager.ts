import EventManager from '@/Runtime/EventManager';
import { Component } from '@eva/eva.js';
import { CONTROLLER_ENUM, EVENT_ENUM, PARAMS_NAME_ENUM } from '@/Enums';
import { TILE_HEIGHT, TILE_WIDTH } from '@/constants';
import PlayerStateMachine from './PlayerStateMachine';

export class PlayerManager extends Component {
  static componentName = 'PlayerManager'; // 设置组件的名字

  pos_x: number;
  pos_y: number;
  pos_targetX: number;
  pos_targetY: number;
  speed: number = 1 / 10;
  playerFSM: PlayerStateMachine;

  init() {
    this.playerFSM = this.gameObject.addComponent(new PlayerStateMachine());
    this.pos_x = 0;
    this.pos_y = 0;
    this.pos_targetX = 0;
    this.pos_targetY = 0;
    EventManager.instance.on(EVENT_ENUM.PLAYER_CTRL, this.move, this);
    this.playerFSM.setParams(PARAMS_NAME_ENUM.IDLE, true);
  }

  update() {
    this.updatePlayerPos();
    this.gameObject.transform.position.x = this.pos_x * TILE_WIDTH - 1.5 * TILE_WIDTH;
    this.gameObject.transform.position.y = this.pos_y * TILE_HEIGHT - 1.5 * TILE_HEIGHT;
  }

  // 更新玩家位置
  updatePlayerPos() {
    if (Math.abs(this.pos_x - this.pos_targetX) < 0.01 && Math.abs(this.pos_y - this.pos_targetY) < 0.01) {
      this.pos_x = this.pos_targetX;
      this.pos_y = this.pos_targetY;
    }

    if (this.pos_x > this.pos_targetX) {
      this.pos_x -= this.speed;
    } else if (this.pos_x < this.pos_targetX) {
      this.pos_x += this.speed;
    }

    if (this.pos_y > this.pos_targetY) {
      this.pos_y -= this.speed;
    } else if (this.pos_y < this.pos_targetY) {
      this.pos_y += this.speed;
    }
  }

  // 玩家移动
  move(inputDir: CONTROLLER_ENUM) {
    console.log('player move', inputDir);
    switch (inputDir) {
      case CONTROLLER_ENUM.LEFT:
        this.pos_targetX -= 1;
        break;
      case CONTROLLER_ENUM.RIGHT:
        this.pos_targetX += 1;
        break;
      case CONTROLLER_ENUM.TOP:
        this.pos_targetY -= 1;
        break;
      case CONTROLLER_ENUM.BOTTOM:
        this.pos_targetY += 1;
        break;
      case CONTROLLER_ENUM.TURNLEFT:
        console.log('turn left');
        this.playerFSM.setParams(PARAMS_NAME_ENUM.TURNLEFT, true);
        break;
      case CONTROLLER_ENUM.TURNRIGHT:
        console.log('turn right');
        break;
    }
  }
}

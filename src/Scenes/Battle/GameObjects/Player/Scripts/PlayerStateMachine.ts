import State from '@/Base/state';
import { PARAMS_NAME_ENUM, FSM_PARAMS_TYPE_ENUM } from '@/Enums';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

export type IParamsValueType = number | boolean;

export interface IParams {
  type: FSM_PARAMS_TYPE_ENUM;
  value: IParamsValueType;
}

export const ANIMATION_SPEED = 1000 / 8;

export const getInitParamsTriger = () => {
  return {
    type: FSM_PARAMS_TYPE_ENUM.TRIGGER,
    value: false,
  };
};

export default class PlayerStateMachine extends State {
  private _currentState: State = null;

  params: Map<string, IParams> = new Map();
  stateMachines: Map<string, State> = new Map();

  get currentState(): State {
    return this._currentState;
  }

  set currentState(value: State) {
    this._currentState = value;
    this._currentState.run();
  }

  getParams(paramName: PARAMS_NAME_ENUM): IParams {
    if (this.params.has(paramName)) {
      return this.params.get(paramName);
    }
  }

  setParams(paramName: PARAMS_NAME_ENUM, value: IParamsValueType) {
    if (this.params.has(paramName)) {
      this.params.get(paramName).value = value;
      this.run();
    }
  }

  init() {
    // 添加动画
    this.gameObject.addComponent(
      new SpriteAnimation({
        resource: 'player_idle_top',
        speed: ANIMATION_SPEED,
        autoPlay: false,
        forwards: true,
      }),
    );

    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  // 初始化参数
  initParams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTriger());
    this.params.set(PARAMS_NAME_ENUM.TURNLEFT, getInitParamsTriger());
  }

  // 初始化状态机
  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new State(spriteAnimation, 'player_idle_top'));
    this.stateMachines.set(PARAMS_NAME_ENUM.TURNLEFT, new State(spriteAnimation, 'player_turn_left_top', 1));
  }

  // 初始化动画事件
  initAnimationEvent() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
    });
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
        if (this.params.get(PARAMS_NAME_ENUM.TURNLEFT)) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT);
        } else {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        }
        break;
      default:
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        break;
    }
  }
}

import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { Event } from '@eva/plugin-renderer-event';
import { Transition } from '@eva/plugin-transition';
import EventManager from '@/Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from '@/Enums';

const CTRL_WIDTH = 70;
const CTRL_HEIGHT = 60;
// const GAP_HEIGHT = 3;

const getPosition = (index: number) => {
  const xAxis = Math.floor((index - 1) / 2);
  const yAxis = (index - 1) % 2;

  return {
    x: (xAxis - 1) * CTRL_WIDTH,
    y: yAxis * CTRL_HEIGHT,
  };
};

const ControllerButton = (btnType: CONTROLLER_ENUM, index: number) => {
  // 创建
  const controllerButton = new GameObject('controllerButton', {
    size: {
      width: CTRL_WIDTH,
      height: CTRL_HEIGHT,
    },
    position: getPosition(index),
    origin: {
      x: 0.5,
      y: 0.5,
    }, // 物体原点（物体内部的一个点）
    anchor: {
      x: 0.5,
      y: 1,
    }, // 锚点，相对于父级的宽高的比率的一个点，物体的原点会相对于这个点进行位移
  });

  // 精灵图
  const ctrlSprite = new Sprite({
    resource: 'ctrl',
    spriteName: `ctrl (${index}).png`,
  });
  controllerButton.addComponent(ctrlSprite);

  // 事件
  const ctrlEvent = new Event();
  const ctrlEventCom = controllerButton.addComponent(ctrlEvent);

  // 动画
  const ctrlTransition = new Transition();
  const transitionAni = controllerButton.addComponent(ctrlTransition);

  transitionAni.group = {
    small: [
      {
        name: 'scale.x',
        component: controllerButton.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out',
          },
          {
            time: 100,
            value: 0.9,
            tween: 'ease-in',
          },
        ],
      },
      {
        name: 'scale.y',
        component: controllerButton.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out',
          },
          {
            time: 300,
            value: 0.9,
            tween: 'ease-in',
          },
        ],
      },
    ],
    big: [
      {
        name: 'scale.x',
        component: controllerButton.transform,
        values: [
          {
            time: 0,
            value: 0.9,
            tween: 'ease-out',
          },
          {
            time: 100,
            value: 1,
            tween: 'ease-in',
          },
        ],
      },
      {
        name: 'scale.y',
        component: controllerButton.transform,
        values: [
          {
            time: 0,
            value: 0.9,
            tween: 'ease-out',
          },
          {
            time: 300,
            value: 1,
            tween: 'ease-in',
          },
        ],
      },
    ],
  };

  // 事件添加
  ctrlEventCom.on('touchstart', () => {
    console.log('touchstart');
    transitionAni.play('small');
  });

  const touchEndHandler = () => {
    console.log('touchend');
    transitionAni.play('big');

    EventManager.instance.emit(EVENT_ENUM.PLAYER_CTRL, [btnType]);
  };

  ctrlEventCom.on('touchend', touchEndHandler);

  ctrlEventCom.on('touchendoutside', touchEndHandler);

  return controllerButton;
};

export default ControllerButton;

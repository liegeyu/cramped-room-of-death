import { GameObject } from '@eva/eva.js';
import ControllerButton from './GameObjects/ControllerButton';
import { CONTROLLER_ENUM } from '@/Enums';

const Controller = () => {
  // 创建
  const controller = new GameObject('controller', {
    position: {
      x: 0,
      y: -140,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    }, // 物体原点（物体内部的一个点）
    anchor: {
      x: 0.5,
      y: 1,
    }, // 锚点，相对于父级的宽高的比率的一个点，物体的原点会相对于这个点进行位移
  });

  // 添加按钮
  for (let index = 1; index <= 6; index++) {
    const ctrlArr = [
      CONTROLLER_ENUM.TURNLEFT,
      CONTROLLER_ENUM.LEFT,
      CONTROLLER_ENUM.TOP,
      CONTROLLER_ENUM.BOTTOM,
      CONTROLLER_ENUM.TURNRIGHT,
      CONTROLLER_ENUM.RIGHT,
    ];
    const controllerButton = ControllerButton(ctrlArr[index - 1], index);
    controller.addChild(controllerButton);
  }

  return controller;
};

export default Controller;

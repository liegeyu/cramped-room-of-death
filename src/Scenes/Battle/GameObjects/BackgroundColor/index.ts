import { GameObject } from '@eva/eva.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants';
import { Graphics } from '@eva/plugin-renderer-graphics';

const BackgroundColor = () => {
  // 创建
  const backgroundColor = new GameObject('backgroundColor', {});
  // 设置属性
  const graphics = backgroundColor.addComponent(new Graphics());
  graphics.graphics.beginFill(0x140a27, 1);
  graphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  graphics.graphics.endFill();

  return backgroundColor;
};

export default BackgroundColor;

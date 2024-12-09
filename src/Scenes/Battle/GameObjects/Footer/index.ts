import { Text } from '@eva/plugin-renderer-text';
import { GameObject } from '@eva/eva.js';

const Footer = () => {
  const footer = new GameObject('footer', {
    position: {
      x: 0,
      y: -16,
    }, // 位移
    origin: {
      x: 0.5,
      y: 1,
    }, // 物体原点（物体内部的一个点）
    anchor: {
      x: 0.5,
      y: 1,
    }, // 锚点，相对于父级的宽高的比率的一个点，物体的原点会相对于这个点进行位移
  });

  footer.addComponent(
    new Text({
      text: '欢迎使用 eva.js 互动游戏开发体系',
      style: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        fill: ['#ffffff'],
      },
    }),
  );

  return footer;
};

export default Footer;

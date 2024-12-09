/**
 * TODO 实现播放动画的能力
 */
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
import { Component } from '@eva/eva.js';

export default class State extends Component {
  spriteAnimation?: SpriteAnimation;
  animationName?: string;
  times?: number;

  constructor(spriteAnimation?: SpriteAnimation, animationName?: string, times?: number) {
    super();
    this.spriteAnimation = spriteAnimation;
    this.animationName = animationName;
    this.times = times;
  }

  run() {
    this.spriteAnimation.resource = this.animationName;
    this.spriteAnimation.play(this.times);
  }
}

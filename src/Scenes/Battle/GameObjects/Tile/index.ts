import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { TILE_HEIGHT, TILE_WIDTH } from '@/constants';

const Tile = (spriteStr: string, offsetX: number, offsetY: number) => {
  const tileItemGameObj = new GameObject('tileItem', {
    size: {
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
    },
    position: {
      x: offsetX * TILE_WIDTH, // i 代表列，j 代表行
      y: offsetY * TILE_HEIGHT,
    },
  });

  const tileItemSprite = new Sprite({
    resource: 'tile',
    spriteName: spriteStr,
  });

  tileItemGameObj.addComponent(tileItemSprite);
  return tileItemGameObj;
};

export default Tile;

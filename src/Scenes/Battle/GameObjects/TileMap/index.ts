import { GameObject } from '@eva/eva.js';
import { TileMapManager } from './Scripts/TileMapManager';

const TileMap = () => {
  const tileMapGameObj = new GameObject('tileMap', {});

  // TODO: add tilemap
  tileMapGameObj.addComponent(new TileMapManager());

  return tileMapGameObj;
};

export default TileMap;

/**
 * 生成随机数,左开右闭
 * @param min
 * @param max
 * @returns
 */
export const randomByRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

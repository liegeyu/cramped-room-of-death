import Singleton from '@/Base/singleton';

export type IFunction = (...param: unknown[]) => void;

export interface IEventFunc {
  func: IFunction;
  ctx: unknown;
}

export default class EventManager extends Singleton {
  static get instance() {
    return super.getInstance<EventManager>();
  }

  eventDic: Map<string, Array<IEventFunc>> = new Map();

  /**
   * 注册事件
   * @param event
   * @param func
   * @param ctx
   */
  on(event: string, func: IFunction, ctx?: unknown) {
    if (this.eventDic.has(event)) {
      this.eventDic.get(event)?.push({ func, ctx });
    } else {
      this.eventDic.set(event, [{ func, ctx }]);
    }
  }

  /**
   * 卸载事件
   * @param event
   * @param func
   */
  off(event: string, func: IFunction) {
    if (this.eventDic.has(event)) {
      const index = this.eventDic.get(event)?.findIndex(funcItem => funcItem.func === func);

      if (index !== -1) {
        this.eventDic.get(event)?.splice(index, 1);
      }
    }
  }

  /**
   * 触发事件
   * @param event
   */
  emit(event: string, ...params: unknown[]) {
    if (this.eventDic.has(event)) {
      this.eventDic.get(event)?.forEach(funcItem => {
        if (funcItem.ctx) {
          funcItem.func.apply(funcItem.ctx, ...params);
        } else {
          funcItem.func(...params);
        }
      });
    }
  }

  /**
   * 清空事件
   */
  clear() {
    this.eventDic.clear();
  }
}

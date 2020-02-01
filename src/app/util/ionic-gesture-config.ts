/* tslint:disable:member-access */
import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HammerInstance } from '@angular/platform-browser/src/dom/events/hammer_gestures';

/**
 * Fonte: https://medium.com/madewithply/ionic-4-long-press-gestures-96cf1e44098b
 */
@Injectable()
export class IonicGestureConfig extends HammerGestureConfig {
  // @ts-ignore
  buildHammer(element: HTMLElement): HammerInstance {
    const mc = new (<any>window).Hammer(element);

    for (const eventName in this.overrides) {
      if (eventName) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }

    return mc;
  }
}

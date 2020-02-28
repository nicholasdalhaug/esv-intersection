import { select, Selection } from 'd3-selection';
import { Layer } from './Layer';
import { OnMountEvent, OnUpdateEvent } from '../interfaces';

export abstract class SVGLayer extends Layer {
  elm: Selection<SVGElement, any, null, undefined>;

  onMount(event: OnMountEvent) {
    super.onMount(event);
    if (!this.elm) {
      this.elm = select(event.elm).append('svg');
    }
  }

  onUnmount() {
    super.onUnmount();
    this.elm.remove();
    this.elm = null;
  }

  onUpdate(event: OnUpdateEvent) {
    if (!this.elm) {
      return;
    }
    super.onUpdate(event);
    const { elm } = this;
    const { xScale, yScale } = event;
    const [, width] = xScale.range();
    const [, height] = yScale.range();

    elm
      .attr('height', height)
      .attr('width', width)
      .attr('style', `position:absolute; opacity: ${this.opacity};z-index:${this.order}`);
  }
}

import { NAVBAR_HEIGHT } from '@/constants/sizes';

// @flow
export default class Canvas {
  constructor(
    element: HTMLCanvasElement,
    margin = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  ) {
    this.element = element;
    this.margin = margin;

    // init height
    this.element.width = window.innerWidth - margin.left - margin.right;
    this.element.height = window.innerHeight - margin.top - margin.bottom - NAVBAR_HEIGHT;

    window.addEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { margin, element } = this;
    element.width = window.innerWidth - margin.left - margin.right;
    element.height = window.innerHeight - margin.top - margin.bottom - NAVBAR_HEIGHT;
  };

  get context() {
    return this.element.getContext('2d');
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }

  destory() {
    this.element.remove();
    window.removeEventListener('resize', this.onResize);
  }
}

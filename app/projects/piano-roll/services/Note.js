// @flow
import { Transport } from 'tone';

export const LENGTH_PER_SECOND = 100; // px
export const TOTAL_WIDTH = 960; // px
export const SECONDS_ON_SCREEN = 20; // seconds

export default class Note {
  constructor(ctx, name, offset, height, value, time, duration, color) {
    this.ctx = ctx;
    this.name = name;
    this.value = value;
    this.height = height;
    this.time = time;
    this.color = color;
    // offset the note height
    this.offset = offset;
    this.duration = Transport.toSeconds(duration);

    this.from = Transport.toSeconds(time);
    this.to = Transport.toSeconds(time + duration);
  }

  static createNote({
    context, name, value, time, duration, color, offset, height,
  }) {
    if (!height) {
      throw new Error('Note.createNote(): height must be a number and should be larger than 0');
    }
    return new Note(context, name, offset, height, value, time, duration, color);
  }

  get width() {
    return (this.to - this.from) * LENGTH_PER_SECOND;
  }

  get x() {
    return (this.from - Transport.getSecondsAtTime()) * (TOTAL_WIDTH / SECONDS_ON_SCREEN);
  }

  get y() {
    return this.height * (this.value - this.offset) + 1; // add little padding
  }

  draw() {
    if (this.x + this.width <= 0) {
      return;
    }
    const x = Math.min(0, this.x);
    this.ctx.save();
    this.ctx.fillStyle = this.color || '#000';
    this.ctx.fillRect(Math.max(this.x, 0), this.y, this.width + x, this.height);
    this.ctx.restore();
  }
}

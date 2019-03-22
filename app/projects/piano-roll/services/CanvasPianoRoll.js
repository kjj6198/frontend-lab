import { Transport } from 'tone';
import { LENGTH_PER_SECOND } from './Note';

export default class PianoRoll {
  constructor(ctx, notes) {
    this.ctx = ctx;
    this.notes = notes;

    this.startTime = Transport.now() / LENGTH_PER_SECOND;
    this.draw = this.draw.bind(this);
    this.isPlaying = false;
    this.animationID = null;
  }

  play() {
    this.isPlaying = true;
    Transport.start();
    this.animationID = this.draw();
  }

  pause() {
    if (this.animationID) {
      this.isPlaying = false;
      Transport.pause();
      cancelAnimationFrame(this.animationID);
      this.animationID = null;
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(150, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.notes
      .filter(note => note.x + note.width >= 0)
      .forEach((note) => {
        note.draw();
      });
    this.ctx.restore();
    if (this.isPlaying) {
      return requestAnimationFrame(this.draw);
    }

    return null;
  }
}

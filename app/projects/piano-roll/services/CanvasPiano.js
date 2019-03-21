// @flow
import Tone from 'tone';

export default class CanvasPiano {
  constructor(context: CanvasRenderingContext2D, height: number, low: number, high: number) {
    this.ctx = context;
    // lowest note
    this.low = low;
    // highest note
    this.high = high;

    // total height of piano
    this.height = height;

    window.addEventListener('resize', this.draw.bind(this));
  }

  get numOfNotes() {
    let cache = null;
    if (!cache) {
      cache = this.high - this.low + 1;
    }
    return cache;
  }

  get whiteNotes() {
    let result = 0;
    for (let i = this.low; i <= this.high; i += 1) {
      const isWhite = !Tone.Frequency(i, 'midi')
        .toNote()
        .includes('#');
      if (isWhite) {
        result += 1;
      }
    }

    return result;
  }

  trigger(note: number) {}

  draw() {
    const { ctx } = this;
    const noteHeight = Math.floor(this.height / this.whiteNotes);
    const halfHeight = noteHeight / 2;
    const noteWidth = 150;
    const blackNoteHeight = noteHeight / 1.8;
    const blackNoteWidth = 100;
    ctx.save();
    for (let i = this.low; i <= this.high; i += 1) {
      ctx.beginPath();
      const note = Tone.Frequency(i, 'midi').toNote();
      const isBlack = note.includes('#');
      if (!isBlack) {
        ctx.globalCompositeOperation = 'destination-over';
        ctx.translate(0, i === this.low ? 1 : noteHeight);
        ctx.strokeRect(0, 0, noteWidth, noteHeight);
        ctx.globalCompositeOperation = 'source-over';
        ctx.font = '14px bold';
        ctx.textAlign = 'center';
        ctx.fillText(note, noteWidth - 20, noteHeight / 2 + 7);
      } else {
        ctx.save();
        ctx.translate(0, halfHeight + blackNoteHeight / 2 - 2);
        ctx.fillRect(0, 0, blackNoteWidth, blackNoteHeight);
        ctx.restore();
      }
    }
    ctx.restore();
  }
}

import { getPartialVolume } from '@/audio/AudioAnalyser';

// @flow

export default class WaveformCanvas {
  constructor(
    ctx: CanvasRenderingContext2D,
    spectrum: Uint8Array,
    radius: number,
    volume: number,
    image?: HTMLImageElement,
  ) {
    this.ctx = ctx;
    this.spectrum = spectrum;
    this.radius = radius;
    this.rotation = 0;
    this.volume = volume;
    this.image = image;
  }

  clearRotation() {
    this.rotation = 0;
    this.draw();
  }

  spectrumToPoints() {
    const { spectrum } = this;
    const result = [];
    const interval = Math.floor(spectrum.length / 150);
    for (let i = 0; i < spectrum.length && result.length < 150; i += interval) {
      result.push(getPartialVolume(spectrum, i, i + interval) / this.volume);
    }

    this.points = result.map((vol, i) => {
      const angle = (i / result.length) * 360 * (Math.PI / 180);
      return {
        x: Math.cos(angle) * this.radius,
        y: Math.sin(angle) * this.radius,
        volume: vol,
        angle,
      };
    });
  }

  draw() {
    const { ctx, radius } = this;
    this.spectrumToPoints();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate(Math.PI / 180 * this.rotation);
    ctx.lineWidth = 4;
    if (this.image) {
      const imageWidth = this.radius - 15;
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, imageWidth, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(this.image, -imageWidth, -imageWidth, imageWidth * 2, imageWidth * 2);
      ctx.beginPath();
      ctx.arc(0, 0, imageWidth, 0, Math.PI * 2, true);
      ctx.clip();
      ctx.closePath();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, imageWidth / 4, 0, Math.PI * 2, true);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();
    }

    this.points.forEach((p) => {
      ctx.strokeStyle = '#000';
      ctx.beginPath();
      const x2 = Math.cos(p.angle) * (p.volume * radius + radius);
      const y2 = Math.sin(p.angle) * (p.volume * radius + radius);
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
    ctx.restore();
  }
}

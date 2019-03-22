// https://stackoverflow.com/questions/14789283/what-does-the-fft-data-in-the-web-audio-api-correspond-to/14789992#14789992
// N * samplerate / fftSize
function mapSpectrumToFrequency(n, sampleRate, fftSize) {
  return (n * sampleRate) / fftSize;
}

export function getPartialVolume(spectrum, from, to) {
  if (from > to) {
    throw new RangeError('from can not be larger than to.');
  }
  let sum = 0;
  for (let i = from; i < to; i += 1) {
    sum += spectrum[i] ** 2;
  }

  return Math.sqrt(sum / (to - from + 1));
}

export default class AudioAnalyser {
  constructor(context: AudioContext, audio, options = {}) {
    this.context = context;
    this.sampleRate = context.sampleRate;
    this.analyser = context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.1;
    this.analyser.fftSize = 2048;
    this.source = context.createMediaElementSource(audio);

    this.script = context.createScriptProcessor(2048 * 2, 1, 1);

    this.spectrum = new Uint8Array(this.analyser.frequencyBinCount);
    this.source.connect(this.analyser);
    this.script.addEventListener('audioprocess', this.processNode);
    this.onProcessNode = options.onProcessNode;
  }

  get totalVolume() {
    let volume = 0;
    this.spectrum.forEach((val) => {
      volume += val ** 2;
    });

    volume /= this.spectrum.length;
    return Math.sqrt(volume);
  }

  processNode = () => {
    this.analyser.getByteFrequencyData(this.spectrum);
    if (this.onProcessNode && typeof this.onProcessNode === 'function') {
      this.onProcessNode(this.spectrum);
    }
  };

  stopProcessNode() {
    this.script.removeEventListener('audioprocess', this.processNode);
  }

  connect() {
    // default to master.
    this.analyser.connect(this.context.destination);
    this.analyser.connect(this.script);
    this.script.connect(this.context.destination);
  }

  mapNodeToFrequency() {
    // collect frequency range into array.
    const highFreq = [];
    const midFreq = [];
    const lowFreq = [];
    const veryLowReq = [];
    const { sampleRate } = this;
    const fftSize = 2048;

    this.spectrum.forEach((_, i) => {
      const frequency = mapSpectrumToFrequency(i, sampleRate, fftSize);

      if (frequency < 40) {
        veryLowReq.push(frequency);
      } else if (frequency >= 40 && frequency <= 220) {
        lowFreq.push(frequency);
      } else if (frequency > 200 && frequency <= 3000) {
        midFreq.push(frequency);
      } else if (frequency > 2500) {
        highFreq.push(frequency);
      }
    });

    return {
      high: highFreq,
      mid: midFreq,
      low: lowFreq,
      veryLow: veryLowReq,
    };
  }
}

// @flow
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
  constructor(context: AudioContext, options = {
    audio: HTMLAudioElement,
    source: MediaStreamAudioSourceNode,
  }) {
    this.context = context;
    this.sampleRate = context.sampleRate;
    this.analyser = context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.1;
    this.analyser.fftSize = 2048;

    // determine source media.
    // can be file(audio), network API(audio) or microphone.
    if (options.source) {
      this.source = context.createMediaStreamSource(options.source);
    } else {
      this.audio = options.audio;
      this.source = context.createMediaElementSource(options.audio);
    }

    this.script = context.createScriptProcessor(2048 * 2, 1, 1);

    this.spectrum = new Uint8Array(this.analyser.frequencyBinCount);
    this.source.connect(this.analyser);
    this.onProcessNode = options.onProcessNode;

    // we only want to start processing when audio is playing.
    if (options.audio) {
      this.audio.addEventListener('play', this.process);
      this.audio.addEventListener('pause', this.stopProcessNode);
    }
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

  process = () => {
    this.script.addEventListener('audioprocess', this.processNode);
  }

  destory = () => {
    this.stopProcessNode();
    this.context.close();
    if (this.source) {
      this.source.disconnect();
      this.analyser.disconnect();
    }
    if (this.audio) {
      this.audio.removeEventListener('play', this.process);
      this.audio.removeEventListener('pause', this.stopProcessNode);
    }

    this.audio = null;
    this.source = null;
    this.analyser = null;
  }

  stopProcessNode = () => {
    this.script.removeEventListener('audioprocess', this.processNode);
  }

  connect() {
    // default to master.
    this.analyser.connect(this.context.destination);
    this.analyser.connect(this.script);
    this.script.connect(this.context.destination);
  }

  /**
   * map all nodes to 4 area data.
   * very low: 0 ~ 40Hz
   * low: 40 ~ 220Hz
   * mid: 200 ~ 3000Hz
   * high: > 2500Hz
   * TODO: Maybe we can actually skip the frequency that people can not hear?
   */
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

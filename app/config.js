export default {
  assetPath: process.env.NODE_ENV === 'development' ? '/app' : '/',
  projects: [
    {
      path: '/piano-roll',
      name: 'PianoRoll + MidiConvert',
      image: 'assets/images/piano-roll.png',
      description: '轉換 midi 檔並使用 Tone.js 及 canvas 視覺化的 piano roll',
    },
    {
      path: '/waveform-visualizer',
      name: 'WaveForm Visualizer',
      image: 'assets/images/waveform-visualizer.png',
      description: '將聲音的頻率視覺化，並且練習基本的 AudioContext 操作',
    },
  ],
};

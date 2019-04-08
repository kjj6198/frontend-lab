function createProject({
  path,
  name,
  image,
  description,
}) {
  return {
    path,
    name,
    image: `assets/images/${image}`,
    description,
  };
}

export default {
  assetPath: process.env.NODE_ENV === 'development' ? '/app' : './',
  projects: [
    createProject({
      path: '/piano-roll',
      name: 'PianoRoll + MidiConvert',
      image: 'piano-roll.png',
      description: '(WIP) 轉換 midi 檔並使用 Tone.js 及 canvas 視覺化的 piano roll',
    }),
    createProject({
      path: '/waveform-visualizer',
      name: 'WaveForm Visualizer',
      image: 'waveform-visualizer.png',
      description: '將聲音的頻率視覺化，並且練習基本的 AudioContext 操作',
    }),
    createProject({
      path: '/sobel-art',
      name: 'Sobel 邊緣檢測與視覺化',
      image: 'sobel-art.png',
      description: '透過簡易的 Sobel 運算子將圖片做邊緣化處理',
    }),
  ],
};

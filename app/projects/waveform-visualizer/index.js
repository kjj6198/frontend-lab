import React from 'react';
import SongWaveformCircle from './SongWaveformCircle';

const songs = [
  'https://api.soundcloud.com/tracks/290227901',
  'https://api.soundcloud.com/tracks/593974365',
  'https://api.soundcloud.com/tracks/305188623',
];

export default function WaveformVisualizer() {
  return (
    <div>
      <SongWaveformCircle
        songURL={songs[2]}
        radius={250}
        canvasHeight={1000}
        canvasWidth={1000}
      />
    </div>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import AudioAnalyser from '@/audio/AudioAnalyser';
import { CLIENT_ID } from './constants';
import WaveformCanvas from './canvas/WaveformCanvas';
import SongWaveformCircle from './SongWaveformCircle';

const songs = [
  'https://api.soundcloud.com/tracks/290227901',
  'https://api.soundcloud.com/tracks/593974365',
  'https://api.soundcloud.com/tracks/305188623',
];

export default function WaveformVisualizer() {
  return (
    <div
      onClick={() => {
        // Microphone.canUseMicrophone().then((permitted) => {});

      }}
    >
      <SongWaveformCircle
        songURL={songs[2]}
        radius={250}
        canvasHeight={1000}
        canvasWidth={1000}
      />
    </div>
  );
}

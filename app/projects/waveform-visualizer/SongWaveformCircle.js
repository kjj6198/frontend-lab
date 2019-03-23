// @flow
import React, {
  useEffect, useState, useRef,
} from 'react';
import AudioAnalyser from '@/audio/AudioAnalyser';
import ResponsiveCanvas from '@/components/ResponsiveCanvas';
import { CLIENT_ID } from './constants';
import WaveformCanvas from './canvas/WaveformCanvas';

function useSoundCloudAPI({
  clientID,
  songURL,
  setSongInfo,
}) {
  useEffect(() => {
    const abortController = new AbortController();
    fetch(`${songURL}?client_id=${clientID}`, {
      signal: abortController.signal,
    })
      .then(res => res.json())
      .then((data) => {
        setSongInfo(data);
      });

    return () => abortController.abort();
  }, [songURL, clientID]);
}

function useWaveformCanvas({
  audioRef,
  canvasRef,
  options = {},
}: {
  audioRef: React.Ref<HTMLAudioElement>,
  canvasRef: React.Ref<HTMLCanvasElement>,
  options: {
    radius: number,
    enableRotation?: boolean,
    artworkImage?: HTMLImageElement,
  },
}, input = []) {
  let rotation = 0;
  useEffect(() => {
    if (audioRef.current) {
      const analyser = new AudioAnalyser(
        new AudioContext({
          sampleRate: 44100,
        }),
        {
          audio: audioRef.current,
          onProcessNode: (spectrum) => {
            // TODO
            // 1. module it to resuable class
            // 2. can specify radius
            // 3. can setup the line width and color
            // 4. can setup the linear gradient
            // 5. now it'll create new instance each time, refactor to use pool.
            if (canvasRef.current) {
              const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
              const waveform = new WaveformCanvas(
                ctx,
                spectrum,
                options.radius,
                analyser.totalVolume,
                options.artworkImage,
              );

              if (options.enableRotation) {
                rotation += 5;
                waveform.rotation = rotation % 360;
              }
              requestAnimationFrame(() => waveform.draw());
            }
          },
        },
      );
      analyser.connect();
      return () => analyser.destory();
    }

    return () => {};
  }, [canvasRef, audioRef, ...input]);
}

type Props = {
  songURL: string,
  radius?: number,
  canvasWidth?: number,
  canvasHeight?: number,
};

export default function SongWaveformCircle({
  songURL,
  radius = 100,
  canvasWidth = 1000,
  canvasHeight = 1000,
}: Props) {
  const [artworkImage, setImage] = useState(false);
  const [songInfo, setSongInfo] = useState(null);
  const audio = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    if (songInfo) {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        setImage(image);
      };
      image.src = songInfo.artwork_url.replace(/large/, 't500x500');
    }
  }, [songInfo]);

  useSoundCloudAPI({
    clientID: 'Y9szWsPjYXE7XJAS5YeeakrLQx45A0BM',
    songURL,
    setSongInfo,
  });

  useWaveformCanvas({
    audioRef: audio,
    canvasRef: canvas,
    options: {
      radius,
      artworkImage,
      enableRotation: true,
    },
  }, [canvas, artworkImage]);

  console.log(songInfo);

  return (
    <div>
      { songInfo
        && (
        <audio
          controls
          ref={audio}
          src={`${songInfo.stream_url}?client_id=${CLIENT_ID}`}
          crossOrigin="anonymous"
        >
          <track kind="captions" caption={songInfo.title} />
        </audio>
        )
      }

      <ResponsiveCanvas
        ref={canvas}
        width={canvasWidth}
        height={canvasHeight}
        scale={1.5}
        className=""
      />
    </div>
  );
}

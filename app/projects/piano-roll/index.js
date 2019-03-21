import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Canvas from './services/Canvas';
import CanvasPiano from './services/CanvasPiano';
import SongPlayer from './services/SongPlayer';
import CanvasPianoRoll from './services/CanvasPianoRoll';
import Note from './services/Note';

export default function PianoRoll() {
  const ref = useRef();
  const roll = useRef();
  const playSong = () => {
    const player = new SongPlayer('/app/assets/media/mario-water.mid', {
      mode: 'network',
      onMidiLoaded: (player: SongPlayer) => {
        const notes = [...player.track]
          .map(track => track.notes)
          .reduce((acc, curr) => [...acc, ...curr], [])
          .map(note => Note.createNote({
            context: ref.current.getContext('2d'),
            value: note.midi,
            time: note.time,
            duration: note.duration,
            color: '#27cc95',
            offset: 45,
            height: 18.94,
          }));

        player.track.push();
        const pianoRoll = new CanvasPianoRoll(ref.current.getContext('2d'), notes);
        pianoRoll.play();
        pianoRoll.draw();
        player.play();
        roll.current = pianoRoll;
      },
    });
    player.convertToNotes();
  };

  useEffect(() => {
    if (ref.current) {
      const canvas = new Canvas(ref.current);
      const piano = new CanvasPiano(canvas.context, canvas.height, 45, 100);
      piano.draw();
    }
  }, [ref]);
  return (
    <div>
      <Button onClick={() => (roll.current ? roll.current.pause() : null)}>Stop</Button>
      <Button onClick={() => (roll.current ? roll.current.play() : null)}>Play</Button>
      <canvas ref={ref} onClick={playSong} />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Radio, RadioGroup, FormControlLabel, FormControl,
} from '@material-ui/core';
import SongWaveformCircle from './SongWaveformCircle';

const songs = [
  'https://api.soundcloud.com/tracks/290227901',
  'https://api.soundcloud.com/tracks/593974365',
  'https://api.soundcloud.com/tracks/305188623',
];

export default function WaveformVisualizer() {
  const [selected, setSelected] = useState(songs[0]);
  useEffect(() => {

  }, []);

  return (
    <div>
      <div className="select-menu">
        <FormControl component="fieldset">
          <RadioGroup
            name="songs"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            {songs.map(song => (
              <FormControlLabel
                key={song}
                value={song}
                control={<Radio color="primary" />}
                label={song}
                labelPlacement="end"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <SongWaveformCircle
          songURL={selected}
          radius={250}
          canvasHeight={1000}
          canvasWidth={1000}
        />
      </div>
    </div>
  );
}

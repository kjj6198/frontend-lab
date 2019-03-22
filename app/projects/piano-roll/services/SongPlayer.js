import Tone from 'tone';
import Midi from '@tonejs/midi';

export default class SongPlayer {
  constructor(
    name,
    options = {
      mode: 'network',
    },
  ) {
    this.name = name;
    this.track = [];
    this.loaded = false;
    this.onMidiLoaded = options.onMidiLoaded;
    this.meta = {};
  }

  fromBlob(blob) {
    const midi = new Midi(blob);
    this.loaded = true;
    this.track = [...midi.tracks];
    this.onMidiLoaded(this);
  }

  convertToNotes = () => {
    if (this.track.length === 0 && !this.loaded) {
      Midi.fromUrl(this.name).then((midi) => {
        this.meta = {
          timeSignature: midi.header.timeSignatures[0],
          bpm: midi.header.tempos[0],
        };
        this.track = [...midi.tracks];
        this.loaded = true;

        if (typeof this.onMidiLoaded === 'function') {
          this.onMidiLoaded(this);
        }
      });
    }
  };

  play() {
    if (!this.loaded) {
      if (process.NODE_ENV === 'development') {
        throw new Error('song has not loaded yet, please make sure you call convertToNote.');
      } else {
        this.convertToNotes();
      }
    }

    if (this.track.length !== 0) {
      const now = Tone.now() + 0.5; // prevent noise sound.
      const synth = new Tone.PolySynth(5, Tone.Synth, {
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1,
        },
      }).toMaster();

      this.track.forEach((track) => {
        track.notes.forEach((note) => {
          Tone.Transport.schedule(() => {
            synth.triggerAttackRelease(note.name, note.duration);
          }, note.time);
        });
      });
    }
  }
}

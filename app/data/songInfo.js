// @flow

// SongInfo comes from SoundCloud API
export type SongInfo = {
  artwork_url: string,
  attachments_uri: string,
  created_at: Date,
  description: string,
  duration: number, // ms
  genre: Array<string>,
  permalink_url: string,
  sharing: string,
  stream_url: string,
  streamable: boolean,
  title: string,
  user_id: number,
  user: {
    avatar_url: string,
    id: number,
    permalink_url: string,
  },

};

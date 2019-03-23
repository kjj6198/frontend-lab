// @flow
import { useEffect } from 'react';

type Params = {
  clientID: string,
  songURL: string,
  setSongInfo: *,
};

export default function useSoundCloudAPI({
  clientID,
  songURL,
  setSongInfo,
}: Params) {
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

// @flow
export default class Microphone {
  static canUseMicrophone() {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(
        {
          audio: true, // only enable audio
        },
        resolve,
        reject,
      );
    });
  }

  static recordMicrophone(context: AudioContext) {
    Microphone.canUseMicrophone().then((stream) => {
      const input = context.createMediaStreamSource(stream);
      input.connect(context.destination);
    });
  }
}

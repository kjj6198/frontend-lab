const cache = {};

export default function loadScript(url, callback) {
  if (cache[url]) {
    // prevent load twice.
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;
  cache[url] = true;

  script.onload = callback;

  document.head.appendChild(script);
}

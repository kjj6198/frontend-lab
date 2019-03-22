import LazyComponent from '@/components/LazyComponent';

export default LazyComponent(() => import(/* webpackChunkName: "PianoRoll" */ './index.js'));

import LazyComponent from '@/components/LazyComponent';

export default LazyComponent(() => import(/* webpackChunkName: "WaveformVisualizer" */ './index.js'));

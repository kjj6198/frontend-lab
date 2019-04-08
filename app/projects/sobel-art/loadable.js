import LazyComponent from '@/components/LazyComponent';

export default LazyComponent(() => import(/* webpackChunkName: "SobelArt" */'./index.js'));

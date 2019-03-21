import LazyComponent from '@/components/LazyComponent';

export default LazyComponent(() => import(/* webpackChunkName: "HomePage" */ './index.js'));

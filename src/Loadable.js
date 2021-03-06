import L from 'react-loadable';

import LoadingPage from './LoadingPage';

const Loadable = opts =>
  L({
    loading: LoadingPage,
    delay: 300,
    ...opts
  });

export default Loadable;

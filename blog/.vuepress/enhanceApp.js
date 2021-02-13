export default ({ isServer }) => {
  if (!isServer) {
    const [header] = document.getElementsByTagName('header');
    if (header) {
      // When we run `$ yarn serve`
      // eslint-disable-next-line global-require
      require('./scripts.js');
    } else {
      // When we run `$ yarn dev`
      // TODO why defferent behaviour ? Why `header` element is not loaded
      // immediatly ?
      setTimeout(() => {
        // eslint-disable-next-line global-require
        require('./scripts.js');
      }, 500);
    }
  }
};

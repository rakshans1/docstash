import React from 'react';
import NProgress from 'nprogress';

class Spinner extends React.Component {

  componentWillMount() {
    const { store } = this.context;
    this.previousPendingTasks = store.getState().pendingTasks;
    this.disposeStoreSubscription = store.subscribe(() => {
      const diff = store.getState().pendingTasks - this.previousPendingTasks;
      if (diff > 0) {
        NProgress.start();
      }
      if (diff < 0) {
        NProgress.inc();
      }
      if (store.getState().pendingTasks === 0) {
        NProgress.done();
      }
      this.previousPendingTasks = store.getState().pendingTasks;
    });
  }

  componentWillUnmount() {
    this.disposeStoreSubscription();
  }

  render() {
    return false;
  }
}

Spinner.contextTypes = {
  store: React.PropTypes.shape({
    getState: React.PropTypes.func.isRequired
  })
};

export default Spinner;

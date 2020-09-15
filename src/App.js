import React, { Suspense } from 'react';
import RouteRenderer from './routes/RouteRenderer';

import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import Navbar from './components/Navbar';

function App({ routerConfig, fetchUser }) {
  fetchUser();
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <RouteRenderer routerConfig={routerConfig} />
        </Suspense>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

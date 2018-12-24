import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout} />
      </Layout>
    );
  }
}

export default App;

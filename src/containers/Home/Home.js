import React, { Component } from 'react';
import config from '../../config';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>
            <p>
              <a className={styles.github} href="https://github.com/erikras/react-redux-universal-hot-example"
                 target="_blank">
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

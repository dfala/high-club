import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';
import { MiniInfoBar } from 'components';
import config from '../../config';

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <DocumentMeta title={config.app.title + ': About Us'}/>
        <MiniInfoBar/>
        <p>
          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? 'Remove Image' : 'Show Image'}</button>
        </p>

        {showKitten && <div><img src={kitten}/></div>}
      </div>
    );
  }
}

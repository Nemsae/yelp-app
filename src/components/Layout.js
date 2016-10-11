import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class Layout extends Component {

  render () {
    let path = this.props.location.pathname;

    return (
      <div className='container text-center'>
        <h1>Yelp Me</h1>
        <ul className='nav nav-tabs'>
          <li role='presentation' className={classNames({active: path === '/'})}>
            <Link to='/'>Search Page</Link>
          </li>
          <li role='presentation' className={classNames({active: path === '/businesspage'})}>
            <Link to={'/businesspage'} >Business Page</Link>
          </li>
          <li role='presentation' className={classNames({active: path === '/favorites'})}>
            <Link to={'/favorites'} >Favorites</Link>
          </li>
        </ul>

        {this.props.children}

      </div>
    );
  }
}

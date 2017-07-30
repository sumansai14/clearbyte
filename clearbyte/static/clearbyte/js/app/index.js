import jQuery from 'jquery';
import Tether from 'tether';
import '../../scss/clearbyte.scss';



import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Router from 'react-router';

export default {
  jQuery: jQuery,
  Tether: Tether,
  moment: moment,
  React: React,
  ReactDOM: ReactDOM,
  clearbyte: {
    routes: require('./routes').default,
  },
  Router: Router
}

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {BrowserRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import expect from 'expect';
import $ from 'jQuery';

import {NotFound} from 'NotFound';


describe('NotFound Component', () => {
  it('should exist', () => {
    expect(NotFound).toExist();
  });


  describe('render', () => {
    it('should render component with 3 seconds until redirect', () => {
      const router = TestUtils.renderIntoDocument(<BrowserRouter><NotFound/></BrowserRouter>),
        notFound = TestUtils.findRenderedComponentWithType(router, NotFound);

      const actualSeconds = notFound.state.secondsToRedirect;

      expect(actualSeconds).toBe(3);
    });


    it('should start countdown after rendering', (done) => {
      const router = TestUtils.renderIntoDocument(<BrowserRouter><NotFound/></BrowserRouter>),
        notFound = TestUtils.findRenderedComponentWithType(router, NotFound);

      setTimeout(() => {
        expect(notFound.state.secondsToRedirect).toBe(2);
        done();
      }, 1001);
    });


    it('should render inside component link to start page with class "start-link"', () => {
      const router = TestUtils.renderIntoDocument(<BrowserRouter><NotFound/></BrowserRouter>),
        notFound = TestUtils.findRenderedComponentWithType(router, NotFound),
        $el = $(ReactDOM.findDOMNode(notFound));

      const actualLink = $el.find('.start-link'),
        actualHref = $(actualLink).attr('href');

      expect(actualLink.length).toBe(1);
      expect(actualHref).toEqual('/');
    });


    it('should render proper number of seconds', (done) => {
      const router = TestUtils.renderIntoDocument(<BrowserRouter><NotFound/></BrowserRouter>),
        notFound = TestUtils.findRenderedComponentWithType(router, NotFound),
        $el = $(ReactDOM.findDOMNode(notFound));

      setTimeout(() => {
        const actualText = $el.text();

        expect(actualText).toInclude("2 seconds");
        done();
      }, 1001);
    });


    it('should redirect to start page when time is up', () => {
      const router = TestUtils.renderIntoDocument(<BrowserRouter><NotFound/></BrowserRouter>),
        notFound = TestUtils.findRenderedComponentWithType(router, NotFound);

      setTimeout(() => {
        const redirect = TestUtils.findRenderedComponentWithType(notFound, Redirect);

        expect(redirect.props.to).toBe('/');
        done();
      }, 3001);
    });
  });
});
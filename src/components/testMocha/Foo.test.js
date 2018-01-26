import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Foo from './Foo';

describe("A suite", function() {
  // it("contains spec with an expectation", function() {
  //   expect(shallow(<Foo />).contains(<div className="foo"></div>)).to.equal(false);
  // });

  it("contains spec with an expectation", function() {
    expect(shallow(<Foo />).is('.foo')).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(shallow(<Foo />).find('.foo').length).to.equal(1);
  });

  it("contains spec with 2 div", function() {
    expect(shallow(<Foo />).find('div')).to.have.length(2);
  })
});

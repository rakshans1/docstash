import expect from 'expect';
import React from 'react';
import {mount, shallow } from 'enzyme';
import { CreateAccountScreen } from '../../../components/auth/CreateAccountScreen';

function setup() {
  return shallow(<CreateAccountScreen />);
}

describe('SignIn Form' , () =>{
  it('render form ', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
  });

});

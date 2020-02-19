import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom"

import App from '../App';
import NoMatch from '../components/Home/NoMatch';
import Home from '../components/Home/Home';

test('invalid path should redirect correctly', () =>{
    const wrapper = mount(
        <MemoryRouter initialEntries={['/random']}>
        <App/>
        </MemoryRouter>
    )

    expect(wrapper.find(NoMatch)).toHaveLength(1);
    expect(wrapper.find(Home)).toHaveLength(0);

})
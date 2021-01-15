import React from "react";
import ReactDOM from 'react-dom';
import { fireEvent, waitForElement } from "@testing-library/react";
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Graphs from "../pages/Graphs";

Enzyme.configure({ adapter: new Adapter() })


// snapshot tests
it('Graphs view renders as expected', () => {
  const wrapper = shallow(<Graphs />)
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe("<Graphs />", () => {
  test("renders Graphs  view", async () => {
    const wrapper = shallow(<Graphs />);
    expect(wrapper.find("container"));
  });
});

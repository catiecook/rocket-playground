import React from "react";
import ReactDOM from 'react-dom';
import { fireEvent, waitForElement } from "@testing-library/react";
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from "../components/NavBar";

Enzyme.configure({ adapter: new Adapter() })

it('NavBar rendrs as expected', () => {
  const wrapper = shallow(<NavBar />)
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe("<NavBar />", () => {
  test("renders NavBar view", async () => {
    const wrapper = shallow(<NavBar />)
    expect(wrapper.find("Nav"));
  });
});

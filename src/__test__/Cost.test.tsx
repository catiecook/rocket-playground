import React from "react";
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitForElement } from "@testing-library/react";
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import CostGraph, { QUERY, LaunchesByCost } from "../components/Cost";

Enzyme.configure({ adapter: new Adapter() })

const costMocks = [
  {
    request: {
      query: QUERY,
      variables: {
        rockets: [{ name: 'Falcon 1' }],
      },
    },
    result: {
      data: {
        rockets: 'Falcon 1',
      },
    },
  },
];

// snapshot tests
it('Cost Graph page renders as expected', () => {
  const wrapper = shallow(<CostGraph />)
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe("<Cost />", () => {
  test("renders Cost Graph view", async () => {
      const wrapper = shallow(<CostGraph />)
      expect(wrapper.find("BarChart"));
  });
});

it('calls client without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={ costMocks } addTypename={false}>
      <LaunchesByCost />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});

it('renders without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={ costMocks } addTypename={false}>
      <LaunchesByCost />
    </MockedProvider>,
  );

  await new Promise(resolve => setTimeout(resolve, 0));

  const a = component.root.findByType('h3');
  expect(a.children.join('')).toContain('Launches by Cost');
});

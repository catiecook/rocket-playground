import React from "react";
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitForElement } from "@testing-library/react";
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import YearGraph, { QUERY, LaunchesByYear } from "../components/Year";

Enzyme.configure({ adapter: new Adapter() })

const payloadMocks = [
  {
    request: {
      query: QUERY,
      variables: {
        payloads: [{ nationality: 'Thailand' }],
      },
    },
    result: {
      data: {
        payloads: 'Thailand',
      },
    },
  },
];

const mockArray = [{ nationality: 'Thailand' }, { nationality: 'Japan' }, { nationality: 'Canada' }, { nationality: 'USA' }]

// snapshot tests
it('Year Graph page rendrs as expected', () => {
  const wrapper = shallow(<YearGraph />)
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe("<YearGraph />", () => {
  test("renders Year Graph view", async () => {
      const wrapper = shallow(<YearGraph />)
      expect(wrapper.find("BarChart"));
  });
});

it('calls client without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={ payloadMocks } addTypename={false}>
      <LaunchesByYear />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});

it('renders without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={ payloadMocks } addTypename={false}>
      <LaunchesByYear />
    </MockedProvider>,
  );

  await new Promise(resolve => setTimeout(resolve, 0));

  const a = component.root.findByType('h3');
  expect(a.children.join('')).toContain('Launches by Year');
});

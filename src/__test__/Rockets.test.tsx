import React from "react";
import ReactDOM from 'react-dom';
import { fireEvent, waitForElement } from "@testing-library/react";
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import RocketGraph { QUERY, LaunchByRocketSuccess }  from "../components/Rockets";

Enzyme.configure({ adapter: new Adapter() })

const rocketMocks = [
  {
    request: {
      query: GET_ROCKET_QUERY,
      variables: {
        limit: 200,
      },
    },
    result: {
      data: {
        launch_year: "2020",
        launch_success: true,
        rocket: { name: "Falcon" },
      },
    },
  },
];

// snapshot tests
it('Rockets Graph page rendrs as expected', () => {
  const wrapper = shallow(<RocketGraph />)
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe("<RocketGraph />", () => {
  test("renders Rocket Graph view", async () => {
    const wrapper = shallow(<RocketGraph />)
    expect(wrapper.find("BarChart"));
  });
});

it('renders without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={ rocketMocks } addTypename={false}>
      <LaunchByRocketSuccess />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});

it('Apollo call should show error UI', async () => {
  const rocketMock = {
    request: {
      query: GET_ROCKET_QUERY,
      variables: {
        limit: 200,
      },
    },
    result: {
      data: {
        launch_year: "2020",
        launch_success: true,
        rocket: { name: "Falcon" },
      },
    },
    error: new Error('Error :('),
  };

  const component = TestRenderer.create(
    <MockedProvider mocks={ rocketMocks } addTypename={false}>
      <LaunchesByRocket />
    </MockedProvider>,
  );

  await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

  const tree = component.toJSON();
  expect(tree.children).toContain('Error :(');
});

import React from 'react';
import 'cross-fetch/polyfill';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { BarChart, Bar, Legend, Tooltip, CartesianGrid, YAxis, XAxis }  from 'recharts';
import { createLaunchCountByRocketSuccess } from '../util/decoder.js';
// import '../styles/Graph.scss';

const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

export const QUERY = gql`
  query GetLaunches {
    launchesPast(limit: 200) {
      launch_year
      launch_success
      rocket {
        rocket_name
      }
    }
  }
  `

client.query({
  query: gql`
  query GetLaunches {
    launchesPast(limit: 200) {
      launch_year
      rocket {
        rocket_name
      }
    }
  }
  `
});

export function LaunchByRocketSuccess() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let rocketLaunchData = createLaunchCountByRocketSuccess(data.launchesPast);
  const margin = {top: 5, right: 20, left: 20, bottom: 5};
  console.log(rocketLaunchData)
  return (
    <div className="graphContainer">
      <h3 className="graphTitle">Launches by Rocket</h3>
      <BarChart width={700} height={300} data={ rocketLaunchData }
        margin={ margin }>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip/>
        <Legend />
        <Bar dataKey="launchFailure" stackId="a" fill="#8884d8" />
        <Bar dataKey="launchSuccess" stackId="a" fill="#ECE354" />
      </BarChart>

    </div>
  )
}

export default function Rockets() {
  return (
    <ApolloProvider client={client}>
      <LaunchByRocketSuccess />
    </ApolloProvider>
  );
}

import React from 'react';
import 'cross-fetch/polyfill';
import { ResponsiveContainer, LineChart, Line, Legend, Tooltip, CartesianGrid, YAxis, XAxis } from 'recharts';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { calculateYearCount } from '../util/decoder.js';
import '../styles/Graph.css';

const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

export const QUERY = gql`
  query GetLaunches {
    launchesPast(limit: 200) {
      launch_year
    }
  }
  `

client.query({
  query: gql`
  query GetLaunches {
    launchesPast(limit: 200) {
      launch_year
    }
  }
  `
});

export function LaunchesByYear() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let rocketLaunchData = calculateYearCount(data.launchesPast);

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }

  return(
    <div className="graphContainer">
      <h3 className="graphTitle">Launches by Year</h3>
      <LineChart width={700} height={300} data={ rocketLaunchData }
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip/>
        <Legend />
        <Line dataKey="count" stackId="a" fill="#8884d8" />
      </LineChart>
    </div>
  )
}

export default function Year() {
  return (
    <ApolloProvider client={client}>
      <LaunchesByYear />
    </ApolloProvider>
  )
}

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Legend, Tooltip, CartesianGrid, YAxis, XAxis }  from 'recharts';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { calculateRocketCosts } from '../util/decoder.js';

const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

export const QUERY = gql`
  query GetLaunches {
    rockets {
      cost_per_launch
      name
    }
  }
  `

client.query({
  query: gql`
  query GetLaunches {
    rockets {
      cost_per_launch
      name
    }
  }
  `
});

export function LaunchesByCost() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.rockets);
  let rocketLaunchData = calculateRocketCosts(data.rockets);
  const margin = {top: 5, right: 30, left: 30, bottom: 5};

  return(
    <div className="graphContainer">
      <h3 className="graphTitle">Cost Per Launch</h3>
        <BarChart width={800} height={300} data={ rocketLaunchData }
          margin={ margin }>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip/>
          <Legend />
          <Bar dataKey="cost" fill="#8884d8" />
        </BarChart>
      </div>
  )
}

function Cost() {
  return (
    <ApolloProvider client={client}>
      <LaunchesByCost />
    </ApolloProvider>
  );
}

export default Cost;

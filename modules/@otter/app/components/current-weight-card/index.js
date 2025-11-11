import { useState, useLayoutEffect } from 'react';
import { useGraphql } from '@otter/graphql/client';
import { calendar } from '@otter/dates';

import Card from '../card';

import { row, value } from './styles.module.css';

export default function CurrentWeightCard() {
  const [ currentWeight, setCurrentWeight ] = useState({});

  const [ currentWeightQuery, isLoading ] = useGraphql(`
query {
  currentWeight {
    value
    timestamp
  }
}
  `);

  useLayoutEffect(function() {
    currentWeightQuery().then(function({ currentWeight }) {
      setCurrentWeight(currentWeight);
    })
  }, [ currentWeightQuery ]);

  return (
    <Card title='Current Weight' footer={ `updated ${ calendar(currentWeight.timestamp) }` }>
      <div className={ row }>
        <h1 className={ value }>{ currentWeight.value }</h1>
        <div>kgs</div>
      </div>
    </Card>
  );
};

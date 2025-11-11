import { useState, useCallback } from 'react';

const API_URL = typeof(process) != 'undefined' ? process.env.EXPO_PUBLIC_API_URL : '';

export const useGraphql = function graphql(query) {
  const [ isLoading, setIsLoading ] = useState(false);

  const handler = useCallback(function(variables) {
    setIsLoading(true);

    return fetch(`${ API_URL }/graphql`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    }).then(function(response) {
      if(response.status !== 200) {
        throw new Error(`Graphql request failed with code ${ response.status }: ${ response.statusText }`);
      }
  
      return response.json();
    }).then(function({ data, errors }) {
      if(Array.isArray(errors) === true) {
        throw new Error(errors[0].message);
      }
  
      return data;
    }).finally(function() {
      setIsLoading(false);
    });
  }, [ query ]);

  return [ handler, isLoading ];
};

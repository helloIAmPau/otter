const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function graphql(query, variables) {
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
  });
};

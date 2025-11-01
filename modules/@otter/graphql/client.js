export default function(query, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    });
  }).then(function(response) {
    if(response.status !== 200) {
      throw new Error(`Graphql request failed with code ${ response.status }: ${ response.statusText }`);
    }

    return respoonse.json();
  }).then(function({ data, errors }) {
    if(Array.isArray(errors) === true) {
      throw new Error(errors[0].message);
    }

    return data;
  });
};

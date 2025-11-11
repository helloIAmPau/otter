import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useHealth } from '../hooks/use-health';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home() {
  const { sync, isLoading } = useHealth();

  useLayoutEffect(function() {
    sync().then(function() {
      console.log('Done!');
    }).catch(function(error) {
      console.log(error);
    });
  }, [ sync ]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
};

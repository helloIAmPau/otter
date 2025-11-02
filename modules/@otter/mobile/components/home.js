import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import health from '../services/health';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home() {
  useLayoutEffect(function() {
    health();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
};

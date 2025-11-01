import { StyleSheet, Text, View } from 'react-native';
import useSync from '../hooks/use-sync';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home() {
  const { state, unregister } = useSync();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
};

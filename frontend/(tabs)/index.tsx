import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../app/stores/auth';

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.name}! 👋</Text>
      <Text style={styles.subtitle}>We're glad to have you here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user?.picture && (
          <Image
            source={{ uri: user.picture }}
            style={styles.profilePicture}
          />
        )}
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  signOutButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
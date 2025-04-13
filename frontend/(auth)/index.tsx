import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthStore } from '../app/stores/auth';

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '784356669612-cq5sq9r0kuv1i7duebgh2ls82rodreph.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    webClientId: '784356669612-na4g9tfkj92n782i1c306mni0v88b5on.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setIsLoading(true);
      const { access_token } = response.params;
      
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            picture: data.picture,
          });
          router.replace('../(tabs)');
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe' }}
          style={styles.backgroundImage}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={isLoading}
        >
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
            style={styles.googleIcon}
          />
          <Text style={styles.buttonText}>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
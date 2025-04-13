import * as React from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {googleClientConfig} from '../keys/app';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

WebBrowser.maybeCompleteAuthSession();

const App = () => {
  const [userInfo, setUserInfo] = React.useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = React.useState(true); // Track loading state
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:googleClientConfig.IOS_CLIENT_ID,
    webClientId: googleClientConfig.WEB_CLIENT_ID,
    androidClientId:googleClientConfig.ANDROID_CLIENT_ID  });

  // Check AsyncStorage for saved user info
  React.useEffect(() => {
    const getStoredUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo)); // Load the user info if available
        }
      } catch (error) {
        console.error("Error loading user info from AsyncStorage", error);
      } finally {
        setLoading(false); // Stop loading after checking AsyncStorage
      }
    };

    getStoredUserInfo();
  }, []);

  // Async function to handle the onPress event
  const handlePress = async () => {
    await promptAsync(); // This triggers the Google sign-in flow
  };

  // Handling the response to set user info and store it
  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params; // These are usually returned by Google
      console.log("Google response params:", response.params); // Log response params for debugging

      if (id_token) {
        const getUserInfo = async () => {
          try {
            // Use the ID token to get user info from Google
            const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
            const userInfoData = await userInfoResponse.json();
            console.log("User info from Google:", userInfoData); // Log user info for debugging

            if (userInfoData) {
              const { name, email } = userInfoData; // Extract name and email from the response
              setUserInfo({ name, email });

              // Store the user info in AsyncStorage for future use
              await AsyncStorage.setItem("userInfo", JSON.stringify({ name, email }));
            }
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        };

        getUserInfo();
      } else {
        console.log("ID token not available in response");
      }
    }
  }, [response]);

  // If loading, show a loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome TO yaGOo</Text>
      <Button title="Sign in with Google" onPress={handlePress} />
      {userInfo ? (
        <Text>
          Welcome, {userInfo.name} ({userInfo.email})
        </Text>
      ) : (
        <Text>No user info found. Please sign in.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;

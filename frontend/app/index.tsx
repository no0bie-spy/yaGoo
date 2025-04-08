import { View, Text } from 'react-native';
import "./global.css"
import { Link } from 'expo-router';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import { FlipInEasyX } from 'react-native-reanimated';


export default function App() {
  return (
    <View style={
      {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
       
      }
    } className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-2xl">Hello, Tailwind</Text>
      <Text>hello there</Text>
      <Link href={"/explore"}> 
        <Text>Go to explore</Text>
      </Link>
    </View>
  );
}

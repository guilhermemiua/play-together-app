import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles';

export default function Home({ navigation: { navigate } }) {
  return (
    <View style={globalStyles.container}>
      <Text>Hello world</Text>
    </View>
  );
}

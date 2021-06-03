import React from 'react';
import { Text } from 'react-native';

export default function ErrorMessageComponent({ children }) {
  return (
    <Text style={{ color: 'red', display: children ? 'flex' : 'none' }}>
      {children}
    </Text>
  );
}

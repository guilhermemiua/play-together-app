import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import AuthenticatedRoutes from './authenticated';
import UnauthenticatedRoutes from './unauthenticated';
import { COLORS } from '../constants';
import { AuthContext } from '../contexts/AuthContext';

export default function Routes() {
  const { isLoading, isAuthenticated } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <AuthenticatedRoutes />;
  }

  return <UnauthenticatedRoutes />;
}

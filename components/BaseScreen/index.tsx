/** @format */

import { StatusBar, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type BaseScreenProp = {
  children: React.ReactNode;
  fullScreen?: boolean;
};
const BaseScreen: React.FC<BaseScreenProp> = ({ children, fullScreen }) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  return (
    <View
      className='flex-1 '
      style={{ height }}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      {!fullScreen && (
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
          }}>
          {children}
        </View>
      )}
      {fullScreen && <>{children}</>}
    </View>
  );
};

export default React.memo(BaseScreen);

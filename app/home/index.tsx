/** @format */

import { View, Text } from 'react-native';
import React, { use } from 'react';

const Home = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-white'>Home</Text>
    </View>
  );
};

export default React.memo(Home);

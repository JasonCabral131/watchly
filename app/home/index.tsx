/** @format */

import { View, Text } from 'react-native';
import React, { use } from 'react';
import { useGetQuery } from '@/hooks/useGetQuery';
import { MovieApiResponse } from '@/utils/types';
import { API } from '@/constants/apiConfig';

const Home = () => {
  const { data } = useGetQuery<MovieApiResponse>(API.popular);

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-white'>{data?.results[0]?.title}</Text>
    </View>
  );
};

export default React.memo(Home);

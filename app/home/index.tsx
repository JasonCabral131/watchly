/** @format */

import { View, Text, TouchableOpacity } from 'react-native';
import React, { use } from 'react';
import { useGetQuery } from '@/hooks/useGetQuery';
import { MovieApiResponse } from '@/utils/types';
import { API } from '@/constants/apiConfig';
import BaseScreen from '@/components/BaseScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import useViewModel from './useViewModel';

const Home = () => {
  const { data } = useGetQuery<MovieApiResponse>(API.popular);
  const { generateGreetings } = useViewModel();
  return (
    <BaseScreen>
      <View className='flex-1 px-4'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-white font-bold text-3xl'>Watchly</Text>
          <TouchableOpacity>
            <Ionicons
              size={24}
              name='search'
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
        <View className='mt-4'>
          <Text className='text-white font-extrabold text-xl'>
            {generateGreetings().title}
          </Text>
          <Text className='text-white font-semibold text-lg mt-1'>
            {generateGreetings().description}
          </Text>
        </View>
      </View>
    </BaseScreen>
  );
};

export default React.memo(Home);

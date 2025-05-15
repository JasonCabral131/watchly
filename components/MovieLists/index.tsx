/** @format */

import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { isArray } from 'lodash';
import { MovieApiResponse } from '@/utils/types';
import { API } from '@/constants/apiConfig';
import { useGetQuery } from '@/hooks/useGetQuery';
import { useRouter } from 'expo-router';

type props = {
  title: string;
  link: string;
};
const MovieLists: React.FC<props> = ({ title, link }) => {
  const { data } = useGetQuery<MovieApiResponse | null>(link, {
    cache: 'no-cache',
  });
  const router = useRouter();
  return (
    <View className='gap-2 mt-4'>
      <Text className='text-white text-2xl font-extrabold px-4 mb-2'>
        {title}
      </Text>
      <FlatList
        data={isArray(data?.results) ? data?.results : []}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className='w-36 gap-3'
              onPress={() => router.push(`/movie/${item?.id}`)}>
              <Image
                resizeMode='cover'
                source={{ uri: API.image + item?.backdrop_path }}
                className='rounded-lg w-36 h-40 overflow-hidden'
              />
              <Text className='text-white text-sm font-extrabold   text-center'>
                {item?.title}
              </Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View className='mr-2'></View>}
      />
    </View>
  );
};

export default React.memo(MovieLists);

/** @format */

import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import BaseScreen from '@/components/BaseScreen';
import { useGetQuery } from '@/hooks/useGetQuery';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MovieDetail, VideoApiResponse } from '@/utils/types';
import YoutubePlayer from 'react-native-youtube-iframe';
import { first, isArray } from 'lodash';
import { getSize } from '@/constants/sizes';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import { API } from '@/constants/apiConfig';
import MovieLists from '@/components/MovieLists';

const MovieInfo = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: video } = useGetQuery<VideoApiResponse>(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    {
      cache: 'no-cache',
    }
  );
  const { data } = useGetQuery<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      cache: 'no-cache',
    }
  );

  return (
    <BaseScreen fullScreen>
      <View className='flex-1 relative'>
        <ScrollView>
          <TouchableOpacity
            onPress={() => router.back()}
            className='rounded-full w-10 h-10 bg-white/55 justify-center items-center absolute right-4 top-12 z-50'>
            <Ionicons
              name='close-outline'
              size={20}
            />
          </TouchableOpacity>
          <YoutubePlayer
            height={getSize(0.25)}
            play={true}
            videoId={first(video?.results)?.key}
          />
          <View className='flex-1 '>
            <View className='px-4 mt-2'>
              <Text className='text-white text-2xl font-extrabold  text-left'>
                {data?.title}
              </Text>
              <Text className='text-white text-sm font-semibold text-left mt-2'>
                {moment(data?.release_date).format('MMM DD, YYYY')}
              </Text>
              <Text className='text-white text-xs font-medium text-justify mt-2'>
                {data?.overview}
              </Text>
            </View>
            <Text className='text-white text-2xl font-extrabold  text-left px-4 mt-4'>
              Production Company
            </Text>
            <FlatList
              horizontal
              data={
                isArray(data?.production_companies)
                  ? data?.production_companies
                  : []
              }
              showsHorizontalScrollIndicator={false}
              className='mt-4 pl-4'
              renderItem={({ item }) => {
                return (
                  <View className='w-40 '>
                    <Image
                      resizeMode='stretch'
                      source={{ uri: API.image + item?.logo_path }}
                      className='w-40 h-40  rounded-md bg-white '
                    />
                    <Text className='text-white text-sm font-bold mt-2'>
                      {item?.name}
                    </Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => <View className='mr-2'></View>}
            />

            <MovieLists
              link={`movie/${id}/recommendations`}
              title='Recommendations'
            />
          </View>
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default React.memo(MovieInfo);

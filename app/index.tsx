/** @format */

import { View, Text } from 'react-native';
import React, { useCallback } from 'react';
import BaseScreen from '@/components/BaseScreen';
import moment from 'moment';
import PopularMovies from '@/components/PopularMovies';
import MovieLists from '@/components/MovieLists';
import { API } from '@/constants/apiConfig';
import { ScrollView } from 'react-native-gesture-handler';
const Home = () => {
  const generateGreetings = useCallback(() => {
    const currentHour = parseInt(moment().format('HH'), 10);

    if (currentHour >= 1 && currentHour < 12) {
      return {
        title: 'Good Morning ☀️',
        description: 'Start your day with a cinematic adventure.',
      };
    } else if (currentHour >= 12 && currentHour < 18) {
      return {
        title: 'Good Afternoon 🎬',
        description: 'Take a break and dive into a great movie.',
      };
    } else if (currentHour >= 18 && currentHour < 24) {
      return {
        title: 'Good Evening 🌙',
        description: 'Unwind with a story worth watching tonight.',
      };
    } else {
      return {
        title: 'Hello 👋',
        description: 'Any time is a good time for a good movie.',
      };
    }
  }, []);
  return (
    <BaseScreen>
      <View className='flex-1 '>
        <View className='px-4'>
          <View className='flex-row justify-between items-center '>
            <Text className='text-white font-bold text-3xl'>Watchly</Text>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          className='pb-5'>
          <PopularMovies />
          <MovieLists
            link={API.KidMovie}
            title='Kids'
          />
          <MovieLists
            link={API.marvelMovies}
            title='Marvel'
          />
          <MovieLists
            link={API.PHMovies}
            title='Pinoy'
          />
          <MovieLists
            link={API.koreanMovies}
            title='Korean'
          />
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default React.memo(Home);

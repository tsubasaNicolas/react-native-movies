import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import PremiereMovies from '../components/PremiereMovies';
import PopularMovies from '../components/PopularMovies';
import MeInfo from '../components/MeInfo';

export default function HomeScreen() {
  return (
    <ScrollView>
      <MeInfo />

      <View>
        <PremiereMovies />

        <PopularMovies />
      </View>
    </ScrollView>
  );
}

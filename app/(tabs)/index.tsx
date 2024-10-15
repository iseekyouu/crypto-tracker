import { Image, StyleSheet, Platform, Button, SafeAreaView, View } from 'react-native';
import React from 'react';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyRate, { COINT_LIST_ID } from '@/components/CurrencyRate';

export default function HomeScreen() {
  const [data, setData] = React.useState<string | null>(null);

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log("Saving error", e);
    }
  }

  // Retrieve data
  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log("Retrieving error", e);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const value: string = await getData('a') as string;
      setData(value);
    };

    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
      <ThemedView>
        <SafeAreaView>
          <CurrencyRate coinId={COINT_LIST_ID.BITCOIN} />
        </SafeAreaView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  emptyHeader: {
    color: 'red',
    display: 'flex',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});

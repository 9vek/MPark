import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

export default class App extends React.Component {

  async getData() {
    const resp = await fetch('https://ios-dev.shortcutsapi.com/parking-info/parking-info-macau-ios-dev')
    const data = resp.json()
    return data
  }

  render() {
    // const data = await this.getData();
    return (
      <View style={styles.container}>
        <MapView style={styles.map}>
        </MapView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
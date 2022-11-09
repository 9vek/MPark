import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
});

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://ios-dev.shortcutsapi.com/parking-info/parking-info-macau-ios-dev')
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View className="my-2">
        <View className="p-1 mr-2 rounded bg-lime-600">
          <Text className="text-white text-xs"> {item.id}</Text>
        </View>
        <View className="ml-2">
          <Text className="text-bold text-xl">{item.name}</Text>
        </View>
        <View>
          <Text className="text-stone-600">{item.address}</Text>
        </View>
      </View>
    )
  }

  return (

    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> :
        (<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <View>
            <MapView style={styles.map} />
          </View>
          <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}>{data.title}</Text>
          <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10 }}>Parkings:</Text>
          <FlatList
            className="block m-2 bg-stone-50 shadow rounded"
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={renderItem}
          />
        </View>
        )}
    </View>
  );
};
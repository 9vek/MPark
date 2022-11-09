import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';


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
      <Text>
        <Text style={styles.id_tag} className="bg-lime-600 text-white rounded-xl mx-1">{" " + item.id + " "}</Text>
        <Text className="text-bold text-xl">{item.name}</Text> {"\n"}
        <Text>{item.address}</Text>
      </Text>
    )
  }

  return (

    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> :
        (<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
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

const styles = StyleSheet.create({
  id_tag: {
    padding: "2px",
    marginRight: "10px",
    borderRadius: "10px"
  },
});
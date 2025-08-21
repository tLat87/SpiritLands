import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { volcanoes } from '../data/volcanoes';

interface VolcanoSearchProps {
  onVolcanoSelect: (volcano: any) => void;
}

const VolcanoSearch: React.FC<VolcanoSearchProps> = ({ onVolcanoSelect }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = volcanoes.filter(volcano =>
        volcano.name.toLowerCase().includes(text.toLowerCase()) ||
        volcano.country.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleVolcanoSelect = (volcano: any) => {
    onVolcanoSelect(volcano);
    setSearchText('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search volcanoes..."
        placeholderTextColor="#666666"
        value={searchText}
        onChangeText={handleSearch}
      />
      
      {isSearching && searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleVolcanoSelect(item)}
              >
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultCountry}>{item.country}</Text>
              </TouchableOpacity>
            )}
            style={styles.resultsList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  resultsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultsList: {
    borderRadius: 10,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  resultCountry: {
    fontSize: 14,
    color: '#666666',
  },
});

export default VolcanoSearch;

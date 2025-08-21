import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { volcanoes } from '../data/volcanoes';
import VolcanoSearch from './VolcanoSearch';

const { width, height } = Dimensions.get('window');

interface VolcanoMapProps {
  onVolcanoPress?: (volcano: any) => void;
}

const VolcanoMap: React.FC<VolcanoMapProps> = ({ onVolcanoPress }) => {
  const mapRef = useRef<MapView>(null);
  const [mapType, setMapType] = React.useState<'hybrid' | 'satellite' | 'standard'>('hybrid');
  
  const initialRegion = {
    latitude: 20,
    longitude: 0,
    latitudeDelta: 60,
    longitudeDelta: 60,
  };

  const centerOnAllVolcanoes = () => {
    if (mapRef.current) {
      const coordinates = volcanoes.map(volcano => ({
        latitude: volcano.coordinates.latitude,
        longitude: volcano.coordinates.longitude,
      }));
      
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const handleVolcanoSelect = (volcano: any) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: volcano.coordinates.latitude,
        longitude: volcano.coordinates.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }, 1000);
    }
    onVolcanoPress?.(volcano);
  };

  const renderVolcanoMarker = (volcano: any) => (
    <Marker
      key={volcano.id}
      coordinate={{
        latitude: volcano.coordinates.latitude,
        longitude: volcano.coordinates.longitude,
      }}
      title={volcano.name}
      description={`${volcano.country} - ${volcano.height}m`}
      onPress={() => {
        // Center map on volcano
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: volcano.coordinates.latitude,
            longitude: volcano.coordinates.longitude,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }, 1000);
        }
        onVolcanoPress?.(volcano);
      }}
    >
      <View style={styles.markerContainer}>
        <View style={styles.markerDot} />
      </View>
      <Callout>
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>{volcano.name}</Text>
          <Text style={styles.calloutCountry}>{volcano.country}</Text>
          <Text style={styles.calloutHeight}>{volcano.height}m</Text>
          <Text style={styles.calloutType}>{volcano.type}</Text>
        </View>
      </Callout>
    </Marker>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapHeader}>
        <Text style={styles.mapTitle}>World Volcano Map</Text>
        <Text style={styles.volcanoCount}>{volcanoes.length} Volcanoes</Text>
      </View>
      
      {/* Search Component */}
      <VolcanoSearch onVolcanoSelect={handleVolcanoSelect} />
      
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          mapType={mapType}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          showsBuildings={false}
          showsTraffic={false}
        >
          {volcanoes.map(renderVolcanoMarker)}
        </MapView>
        
        {/* Center Map Button */}
        <TouchableOpacity 
          style={styles.centerButton} 
          onPress={centerOnAllVolcanoes}
        >
          <Text style={styles.centerButtonText}>🌋</Text>
        </TouchableOpacity>
        
        {/* Map Type Toggle Button */}
        <TouchableOpacity 
          style={styles.mapTypeButton} 
          onPress={() => setMapType(mapType === 'hybrid' ? 'satellite' : mapType === 'satellite' ? 'standard' : 'hybrid')}
        >
          <Text style={styles.mapTypeButtonText}>
            {mapType === 'hybrid' ? '🗺️' : mapType === 'satellite' ? '🛰️' : '🌍'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  mapHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  mapTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  volcanoCount: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center',
  },
  mapContainer: {
    height: 400,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 20,
    height: 20,
    backgroundColor: '#ff6b35',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutContainer: {
    width: 150,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  calloutCountry: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  calloutHeight: {
    fontSize: 12,
    color: '#ff6b35',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  calloutType: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF0000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerButtonText: {
    fontSize: 24,
  },
  mapTypeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF0000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapTypeButtonText: {
    fontSize: 20,
  },
});

export default VolcanoMap;

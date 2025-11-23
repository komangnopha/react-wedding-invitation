import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { remoteConfig } from 'firebase';
import { getValue } from 'firebase/remote-config';
import { useCallback } from 'react';

const Map = () => {

  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const { lat, lng } = parsedData.mapInfo;
  // const [map, setMap] = useState(null)

  const center = {
    lat,
    lng,
  }

  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB9r8Ire5B_88iJCUJxAokg9c8OzYB3EuA',
  })

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds)
    // setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    map.fitBounds(null)
    // setMap(map)
  }, [])


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  )
};

export default Map;

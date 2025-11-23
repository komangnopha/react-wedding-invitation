import Button from '@/components/Button.tsx';
import styled from '@emotion/styled';
import { remoteConfig } from 'firebase';
import { getValue } from 'firebase/remote-config';

const MapButtons = () => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const { googleMaps } = parsedData.mapInfo;

  return (
    <MapButtonWrapper>
      <Button onClick={() => window.open(googleMaps)}>Google Maps</Button>
    </MapButtonWrapper>
  );
};

export default MapButtons;

const MapButtonWrapper = styled.div`
  margin: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

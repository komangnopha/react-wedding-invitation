import styled from '@emotion/styled';
import Map from './Map.tsx';
import MapButtons from './MapButtons.tsx';

const Location = () => {

  // const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  // const parsedData = JSON.parse(val.asString());
  // const mapInfo = parsedData.mapInfo;
  return (
    <LocationWrapper data-aos="fade-down">
      <Map />
      <MapButtons />
      {/* <Address /> */}
      {/* <Paragraph>{mapInfo.address1}</Paragraph> */}
      {/* <Caption textAlign={'center'}>{mapInfo.address2}</Caption> */}
    </LocationWrapper>
  );
};

export default Location;

const LocationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
`;

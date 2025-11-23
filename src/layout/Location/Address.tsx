import { Caption, PointTitle } from '@/components/Text.tsx';
import { ILocationInfo } from '@/types/data.ts';
import styled from '@emotion/styled';
import { remoteConfig } from 'firebase';
import { getValue } from 'firebase/remote-config';

const Address = () => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const locationInfo = parsedData.locationInfo;
  return (
    <WayWrapper>
      {locationInfo?.map((item: ILocationInfo) => {
        const { title, desc } = item;
        return (
          <Way key={title}>
            <PointTitle>{title}</PointTitle>
            <Caption>{desc}</Caption>
          </Way>
        );
      })}
    </WayWrapper>
  );
};

export default Address;

const WayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0px;
  gap: 20px;
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

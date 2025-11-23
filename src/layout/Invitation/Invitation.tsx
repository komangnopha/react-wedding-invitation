import { Caption, Paragraph } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import { remoteConfig } from 'firebase.ts';
import { getValue } from 'firebase/remote-config';
import CountdownEvent from './Countdown.tsx';

const Invitation = () => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  return (
    <InvitationWrapper>
      {/* <CountdownEvent /> */}
      <Paragraph>{parsedData.greeting.message_invitation}</Paragraph>
      <Caption textAlign={'center'} data-aos="fade-down">
        {parsedData.greeting.eventDetail}
      </Caption>
      <div data-aos="fade-down">
        <CountdownEvent />
      </div>
      {/* <Map />
      <MapButtons /> */}
      <Paragraph>{parsedData.greeting.message_regards}</Paragraph>
      {/* <RoundButton
        target="_blank"
        href=""
        rel="noreferrer">
        Google Calendar Button
      </RoundButton> */}
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

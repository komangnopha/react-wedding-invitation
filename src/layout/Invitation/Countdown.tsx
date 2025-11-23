import styled from '@emotion/styled';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { remoteConfig } from 'firebase';
import { getValue } from 'firebase/remote-config';
import { Component } from 'react';

class Completed extends Component {
    render() {
        return <Message>Event has started</Message>
    }
}

const CountdownEvent = () => {
    const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
    const parsedData = JSON.parse(val.asString());
    const greeting = parsedData.greeting;

    const isMobile = window.innerWidth < 480;

    return (
        <CountdownWrapper>
            {/* <Paragraph>{parsedData.greeting.message_countdown}</Paragraph> */}
            <FlipClockCountdown
                to={greeting.eventDate}
                labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
                digitBlockStyle={{ width: isMobile ? 25 : 40, height: 60, fontSize: isMobile ? 28 : 30, color: '#800000', backgroundColor: '#F4DEDE' }}
                dividerStyle={{ color: 'white', height: 1 }}
                separatorStyle={{ color: '#800000', size: '3px' }}
            >
                <Completed />
            </FlipClockCountdown>
        </CountdownWrapper>
    );
};

export default CountdownEvent;

const CountdownWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const Message = styled.span`
  font-size: 1.5rem;
  color: #28a745;
`;


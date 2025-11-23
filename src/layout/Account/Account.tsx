import Accordion from '@/components/Accordion.tsx';
import { Heading2 } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import { remoteConfig } from 'firebase.ts';
import { getValue } from 'firebase/remote-config';
import AccountWrap from './AccountWrap.tsx';

const Account = () => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const messageGift = parsedData.greeting.message_gift;
  const hostInfo = parsedData.hostInfo;
  return (
    <HostInfoWrapper>
      <Heading2>{messageGift}</Heading2>
      {hostInfo.map((host: any) => {
        return (
          <Accordion title={host.host} key={host.host}>
            {host.accountInfo.map((account: any) => {
              return (
                <AccountWrap
                  key={account.bank}
                  name={account.name}
                  bank={account.bank}
                  account={account.account}
                  kakaopayAccount={account.kakaopayAccount}
                  tossAccount={account.tossAccount}
                />
              );
            })}
          </Accordion>
        );
      })}
    </HostInfoWrapper>
  );
};

export default Account;

const HostInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 0 auto;
`;

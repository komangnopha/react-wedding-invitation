import Heart from '@/assets/icons/heart_plus.svg?react';
import Share from '@/assets/icons/share.svg?react';
import Upward from '@/assets/icons/upward.svg?react';
import Button from '@/components/Button.tsx';
import styled from '@emotion/styled';
import { increment, onValue, ref, update } from 'firebase/database';
import { getValue } from 'firebase/remote-config';
import JSConfetti from 'js-confetti';
import { useEffect, useState } from 'react';
import { realtimeDb, remoteConfig } from '../../firebase.ts';

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const emojis = parsedData.emojis;
  const [count, setCount] = useState(0);
  const dbRef = ref(realtimeDb, 'likes/gung-hadi-army');

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const likes = snapshot.val().likes;
      setCount(Number(likes));
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        alert('URL berhasil disalin.😉😉');
      },
      () => {
        alert('URL gagal disalin.🥲🥲');
      },
    );
  };

  const jsConfetti = new JSConfetti();
  const handleCount = () => {
    void jsConfetti.addConfetti({ emojis });
    void update(dbRef, {
      likes: increment(1),
    });
  };

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav isVisible={isVisible}>
      <Button onClick={handleCount}>
        <Heart fill="#800000" />
        {count || ''}
      </Button>
      <Button onClick={handleCopy}>
        <Share fill="#800000" />
        Share
      </Button>
      <Button onClick={handleScroll}>
        <Upward fill="#800000" />
        Scroll to Top
      </Button>
    </Nav>
  );
};

export default FloatingBar;

const Nav = styled.nav<{ isVisible: boolean }>`
  min-width: 280px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
`;

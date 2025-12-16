import music from '@/assets/audio/music.mp3';
import overlayImage from '@/assets/images/GUS04673.JPG?w=300;600;1200&format=webp&imagetools';
import BottomNav from '@/components/BottomNav';
import { BalineseText, Heading1 } from '@/components/Text';
import Footer from '@/layout/Footer/FooterSection.tsx';
import GalleryWrap from '@/layout/Gallery/GalleryWrap.tsx';
import Guestbook from '@/layout/Guestbook/Guestbook.tsx';
import Invitation from '@/layout/Invitation/Invitation.tsx';
import Main from '@/layout/Main/Main.tsx';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { remoteConfig } from 'firebase';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { useEffect, useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { BounceLoader } from 'react-spinners';
import Wrapper from './components/Wrapper';
import Account from './layout/Account/Account';
import Host from './layout/Contact/Host';



function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const to = urlParams.get('to');
  const [isConfigReady, setIsConfigReady] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(true);
  const [greeting, setGreeting] = useState('');
  // const scrollRef = useRef(null);
  const audioRef = useRef<any>(null);

  useEffect(() => {
    // window.addEventListener('scroll', checkScrollPosition);
    AOS.init({
      duration: 1500,
      easing: 'ease-in-sine',
      once: true,
    });
    fetchAndActivate(remoteConfig)
      .then(() => {
        console.log('Remote Config activated');
        setIsConfigReady(true);
        const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
        const parsedData = JSON.parse(val.asString());
        const greeting = parsedData.greeting;
        setGreeting(greeting.title);
      })
      .catch((err) => {
        console.error('Remote Config error:', err);
        setIsConfigReady(true); // Even if it fails, continue
      });
  }, []);

  useEffect(() => {
    if (isOverlayVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const audio = audioRef.current.audio.current;
      audio.play();
      setTimeout(() => {
        AOS.refresh();
      }, 2000);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayVisible]);

  // const checkScrollPosition = () => {
  //   if (scrollRef.current) {
  //     const { offsetTop } = scrollRef.current;
  //     const scrollPosition = window.scrollY;

  //     if (scrollPosition >= offsetTop) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   }
  // };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  if (!isConfigReady) return <LoaderWrapper><BounceLoader
    size={75}
    color='#800000'
  /></LoaderWrapper>;

  return (
    <>
      <StyledContainer>
        <SectionWrapper data-aos="fade-up" padding='0' id="home">
          <Main />
        </SectionWrapper>
        <WavySectionWrapper id="about" showBottomWave>
          <Host />
        </WavySectionWrapper>
        <SectionWrapper id="wedding">
          <BalineseText>ᬒᬁᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ</BalineseText>
          <Invitation />
          <BalineseText>ᬒᬁᬰᬵᬦ᭄ᬢᬶᬄᬰᬵᬦ᭄ᬢᬶᬄᬰᬵᬦ᭄ᬢᬶᬄᬒᬁ</BalineseText>
        </SectionWrapper>
        {/* <WavySectionWrapper id="location" showTopWave showBottomWave>
          <Heading1>Location</Heading1>
        </WavySectionWrapper> */}
        <WavySectionWrapper id="gallery" showTopWave showBottomWave>
          <Heading1>Gallery</Heading1>
          <GalleryWrap />
        </WavySectionWrapper>
        <SectionWrapper id="account">
          <Heading1>Amplop Digital</Heading1>
          <Account />
        </SectionWrapper>
        <WavySectionWrapper id="guestbook" showTopWave>
          <Heading1>Guestbook</Heading1>
          <Guestbook />
        </WavySectionWrapper>
        <SectionWrapper data-aos="fade-up" padding='0'>
          <Footer />
        </SectionWrapper>
        {/* <FloatingBar isVisible={isVisible} /> */}
        <BottomNav />
        {/* </Container> */}
        <FloatingMusicButton visible={isOverlayVisible}>
          <StyledAudioPlayer
            ref={audioRef}
            src={music}
            autoPlay={false}
            showJumpControls={false}
            showSkipControls={false}
            showDownloadProgress={false}
            showFilledProgress={false}
            showFilledVolume={false}
            customAdditionalControls={[]}
            customVolumeControls={[]}
          />
        </FloatingMusicButton>
        <Overlay visible={isOverlayVisible}>
          <img
            srcSet={`
          ${overlayImage[0]} 300w,
          ${overlayImage[1]} 600w,
          ${overlayImage[2]} 1200w
        `}
            src={overlayImage[2]}
            sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 1200px"
            alt="Background" className="overlay-bg" loading='lazy' />
          <OverlayContent>
            <MainTitle>{greeting}</MainTitle>
            <p>Kepada Bapak/Ibu/Saudara/i</p>
            <h2>{to ?? "Tamu"}</h2>
            <CloseButton onClick={handleCloseOverlay}>Buka Undangan</CloseButton>
            <p>*mohon maaf bila ada kesalahan dalam penulisan nama/gelar</p>
          </OverlayContent>
        </Overlay>
      </StyledContainer>
    </>
  );
}

export default App;

const MainTitle = styled.p`
  font-family: HSSanTokki20-Regular, serif;
  font-size: 2rem;
  color: #ffffff;
  line-height: 120%;
  white-space: pre-line;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: ${({ visible }) => (visible ? 0 : '100%')};
  left: 0;
  width: 100%;
  height: 100%;
  background: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: top 0.7s ease;
  z-index: 999;
  .overlay-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 10;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0.2; /* optional */
  }
`;

const OverlayContent = styled.div`
  text-align: center;
  padding: 2rem;
`;

const CloseButton = styled.button`
  background: #800000;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;

const FloatingMusicButton = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'none' : 'flex')};
  position: fixed;
  bottom: 70px;
  right: 10px;
  z-index: 999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  // background-color: #800000;
  background-color: transparent !important;
  // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    bottom: 10px;
  }
`;


const StyledAudioPlayer = styled(AudioPlayer)`
  background: transparent;
  box-shadow: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .rhap_container {
    background: transparent;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }

  .rhap_controls-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .rhap_main-controls-button {
    color: #800000;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    font-size: 48px;
  }

  .rhap_progress-section,
  .rhap_volume-controls,
  .rhap_download-progress,
  .rhap_additional-controls {
    display: none !important;
  }
`;

const StyledContainer = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    max-width: 25%;
    min-width: 500px;
  }
`;

const wave = css`
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  background-size: 100% 100%;
`;

const SectionWrapper = styled(Wrapper)`
  background-color: #ffffff;
`;

const WavySectionWrapper = styled(Wrapper) <{ showTopWave?: boolean, showBottomWave?: boolean }>`
  position: relative;
  padding-top: ${({ showTopWave }) => showTopWave ? '100px' : '40px'};
  padding-bottom: ${({ showBottomWave }) => showBottomWave ? '100px' : '40px'};

  /* Swapped ::after and ::before to fix wave direction */
  &::after {
    display: ${({ showTopWave }) => showTopWave ? 'block' : 'none'};
    ${wave};
    top: -1px;
    transform: rotate(180deg);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3e%3cpath fill='%23ffffff' fill-opacity='1' d='M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,186.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3e%3c/path%3e%3c/svg%3e");
    background-size: cover;
    left: 0;
    right: 0;
  }

  &::before {
    display: ${({ showBottomWave }) => showBottomWave ? 'block' : 'none'};
    ${wave};
    bottom: -1px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3e%3cpath fill='%23ffffff' fill-opacity='1' d='M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,186.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3e%3c/path%3e%3c/svg%3e");
    background-size: cover;
    left: 0;
    right: 0;
  }
`;

// import mainImg from '@/assets/images/bali13-min.JPG?format=webp&imagetools';
import images from '@/layout/Gallery/Images';
import styled from '@emotion/styled';
import { remoteConfig } from 'firebase';
import { getValue } from 'firebase/remote-config';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Main = () => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const greeting = parsedData.greeting;
  const shuffledImages = Array.from(images.filter((image) => image.orientation == "portrait")).sort(() => 0.5 - Math.random());
  const mainImgSlides = shuffledImages.slice(0, 3);
  return (
    <MainWrapper id="home">
      <Hero>
        <Carousel interval={5000} animationHandler="fade" swipeable={false} useKeyboardArrows={false} autoPlay={true} infiniteLoop={true} showIndicators={false} showArrows={false} showThumbs={false} showStatus={false} >
          {mainImgSlides.map((image, index) => {
            return (
              <SlideWrapper key={index}>
                <img
                  srcSet={`
                ${image.src[0]} 300w,
                ${image.src[1]} 600w,
                ${image.src[2]} 1200w
              `}
                  src={image.src[2]}
                  sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 1200px" loading='lazy' />
                <Overlay>
                  <OverlayTitle>{greeting.title}</OverlayTitle>
                  <OverlaySubtitle>{new Date(greeting.eventDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</OverlaySubtitle>
                  <CtaRow>
                    <p>Scroll to see details</p>
                  </CtaRow>
                </Overlay>
              </SlideWrapper>);
          })}
        </Carousel>
      </Hero>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0 auto !important;
  padding: 0 auto !important;
`;

const Hero = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  .carousel .slide img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.35) 100%);
  z-index: 2;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const OverlayTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 1.8rem;
  line-height: 1.05;
  font-family: HSSanTokki20-Regular, serif;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
`;

const OverlaySubtitle = styled.p`
  margin: 0;
  color: rgba(255,255,255,0.9);
  font-size: 1rem;
`;

const CtaRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;

  a {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    padding: 8px 14px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    backdrop-filter: blur(6px);
  }
  p {
    color: #fff;
  }
`;
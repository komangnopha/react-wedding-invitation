import images from '@/layout/Gallery/Images';
import styled from '@emotion/styled';
import { remoteConfig } from 'firebase';
import { getValue } from 'firebase/remote-config';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FooterSection = () => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const couple_name = parsedData.greeting.couple_name;
  const shuffledImages = Array.from(images.filter((image) => image.orientation == "portrait")).sort(() => 0.5 - Math.random());
  const footerImgSlides = shuffledImages.slice(0, 3);
  return (
    <FooterWrapper>
      {/* <Heading2>{messageLast}</Heading2> */}
      <Carousel interval={5000} animationHandler="fade" swipeable={false} useKeyboardArrows={false} autoPlay={true} infiniteLoop={true} showIndicators={false} showArrows={false} showThumbs={false} showStatus={false} >
        {footerImgSlides.map((image, index) => {
          return (
            <SlideWrapper>
              <img
                key={index}
                srcSet={`
              ${image.src[0]} 300w,
              ${image.src[1]} 600w,
              ${image.src[2]} 1200w
            `}
                src={image.src[2]}
                sizes="(max-width: 600px) 300px, (max-width: 1024px) 600px, 1200px" loading='lazy' />
              <Overlay>
                <OverlayText>
                  Thank You
                </OverlayText>
                <OverlayText>-</OverlayText>
                <OverlayText>
                  {couple_name}
                </OverlayText>
              </Overlay>
            </SlideWrapper>
          );
        })}
      </Carousel>
    </FooterWrapper>
  );
};

export default FooterSection;


const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0 auto !important;
  padding: 0 auto !important;

  .carousel .slide img {
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
  background-color: rgba(0, 0, 0, 0.5); /* Black with 50% opacity */
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayText = styled.div`
  font-family: "Petit Formal Script", cursive;
  font-weight: bold;
  font-size: 18px; 
  color: white;
`;

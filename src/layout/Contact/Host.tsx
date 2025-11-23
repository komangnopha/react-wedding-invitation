import imgBride from '@/assets/images/bali6-min.JPG?w=300;600;1200&format=webp&imagetools';
import imgGroom from '@/assets/images/bali8-min.JPG?w=300;600;1200&format=webp&imagetools';
import { Heading1, Heading2 } from '@/components/Text';
import { BrideAndGroom } from '@/types/data.ts';
import styled from '@emotion/styled';
import { remoteConfig } from 'firebase';
import { getValue } from 'firebase/remote-config';
import { Gallery, Item } from 'react-photoswipe-gallery';

const Host = () => {
  const val = getValue(remoteConfig, 'gung_hadi_army_wedding_data');
  const parsedData = JSON.parse(val.asString());
  const greeting = parsedData.greeting;
  const { groom, bride } = parsedData.greeting.host;
  return (
    <HostContainer>
      <Heading2>{greeting.message_couple}</Heading2>
      <HostInfo img={imgGroom} person={groom} animation="fade-right" />
      <div data-aos="zoom-in"><Heading1>&</Heading1></div>
      <HostInfo img={imgBride} person={bride} animation="fade-left" />
    </HostContainer>
  );
};

export default Host;

const HostInfo = ({
  img,
  person,
  marginBottom,
  animation,
}: { img: string; person: BrideAndGroom; marginBottom?: number; animation?: string }) => {
  return (
    <HostDetails style={{ marginBottom }} data-aos={animation}>
      <ProfileFrame>
        <FrameImage src="/photo-frame.png" alt="Frame" />
        <Gallery
          withDownloadButton={true}
          options={
            {
              preload: [0, 0],
              preloadFirstSlide: false,
            }
          }>
          <Item
            key={person.name}
            cropped={true}
            width="768"
            height="1150"
            original={img[2]}
            thumbnail={img[0]}>
            {({ open }) => (
              <ProfilePhoto
                alt={person.name}
                src={img[0]}
                onClick={open}
              />
            )}
          </Item>
        </Gallery>
        {/* <ProfilePhoto src={img} alt="Profile" /> */}
      </ProfileFrame>
      <HighlightedName>{person.name}</HighlightedName>
      <RelationText>
        <Relation>{person.relation} dari pasangan</Relation>
      </RelationText>
      {person.parents && (
        <ParentWrapper>
          {person.parents.map((parent, index) => (
            <>
              <HighlightedName>
                {parent.name}
              </HighlightedName>
              {index == 0 && (<HighlightedName>
                dan
              </HighlightedName>)}
            </>
          ))}
        </ParentWrapper>
      )}
      <Heading2>{person.origin}</Heading2>
    </HostDetails>
  );
};

const HighlightedName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #4f4f4f;
  margin-right: 5px;
  font-family: HSSanTokki20-Regular, serif;
`;

const HostContainer = styled.div`
  gap: 8px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HostDetails = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  align-items: center;
  font-weight: 700;
`;

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const RelationText = styled.div`
  font-style: normal;
  line-height: 26px;
  display: flex;
  gap: 6px;
  font-weight: 800;
`;

const Relation = styled.div`
  width: inherit;
`;

// Container that holds the frame and the profile image
const ProfileFrame = styled.div`
  position: relative;
  width: 250px; // Adjust to your frame size
  height: 250px;
`;

// The floral frame
const FrameImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  pointer-events: none; // So clicks pass through to profile image if needed
`;

// Profile photo
const ProfilePhoto = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85%; // Smaller than frame
  height: 85%;
  object-fit: cover;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid white; // Optional white border
`;
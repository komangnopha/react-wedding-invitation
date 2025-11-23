import styled from '@emotion/styled';
import PhotoGallery from './PhotoGallery.tsx';

const GalleryWrap = () => {
  // const [isMoreView, setIsMoreView] = useState(false);

  // const onClickImageMoreViewButton = () => {
  //   setIsMoreView(!isMoreView);
  // };

  return (
    <ContentsWrap>
      <PhotoGallery />
      {/* <ImageMoreWrap isMoreView={isMoreView}>
        {!isMoreView && <WhiteGradientOverlay />}
        <PhotoGallery />
      </ImageMoreWrap>
      {!isMoreView && (
        <PlusButton onClick={onClickImageMoreViewButton}>See More Gallery</PlusButton>
      )} */}
    </ContentsWrap>
  );
};

export default GalleryWrap;

const ContentsWrap = styled.div`
  // margin: 0 auto;
  // padding: 0 auto;
  // overflow: hidden;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: 100%;
`;

// const ImageMoreWrap = styled.div<{ isMoreView: boolean }>`
//   position: relative;
//   max-height: ${(props) =>
//     props.isMoreView
//       ? ''
//       : '60vh'}; /* isMoreView 상태가 true일 때는 높이 제한 없이, false일 때는 195px로 작게 보이도록 */
//   overflow: hidden;
// `;

// const WhiteGradientOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     rgba(255, 255, 255, 0) 0%,
//     rgb(255, 255, 255) 90%
//   );
// `;

// const PlusButton = styled.div`
//   width: 100%;
//   box-sizing: border-box;
//   padding: 6px 12px;
//   font-size: 1rem;
//   align-items: center;
//   border-radius: 4px;
//   border: 1px solid #dfdfdf;
//   cursor: pointer;
// `;

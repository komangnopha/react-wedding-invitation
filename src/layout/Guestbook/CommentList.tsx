import styled from "@emotion/styled";
import { onValue, orderByChild, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { realtimeDb } from '../../firebase.ts';
import CommentCard from "./CommentCard.tsx";

const CommentList = () => {
  const [allData, setAllData] = useState<Array<any>>([]);

  const dbRef = query(ref(realtimeDb, 'rsvp/gung-hadi-army'), orderByChild('createdAt'));

  useEffect(() => {
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value as any,
        }));
        const sortedData = dataArray.reverse();
        setAllData(sortedData);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      <MarqueeWrapper>
        <MarqueeContent itemCount={allData.length}>
          {[...allData, ...allData].map((data, index) => (
            <CommentCard key={`${data.id}-${index}`} username={data.sender} time={data.createdAt} comment={data.message} confirmation={data.confirmation} />
          ))}
        </MarqueeContent>
      </MarqueeWrapper>
    </Wrapper>
  );
}

export default CommentList;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
`;

const MarqueeWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  width: 100%;
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
`;

const MarqueeContent = styled.div<{ itemCount: number }>`
  display: inline-flex; /* Changed from flex */
  width: fit-content; /* Added to ensure width is calculated from children */
  flex-direction: row;
  gap: 1rem;
  animation: marquee-h 30s linear infinite;

  @keyframes marquee-h {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

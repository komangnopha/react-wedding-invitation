import styled from "@emotion/styled";
import { onValue, orderByChild, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
// import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';
import { realtimeDb } from '../../firebase.ts';
import CommentCard from "./CommentCard.tsx";

const CommentList = () => {
  const ITEMS_PER_PAGE = 5;
  const [allData, setAllData] = useState<Array<any>>([]);
  // const [confirmationCounts, setConfirmationCounts] = useState<{ [key: string]: number }>({});
  const [currentData, setCurrentData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

        // Count by confirmation
        // const counts: { [key: string]: number } = {};
        // sortedData.forEach(item => {
        //   const key = item.confirmation || 'unknown';
        //   counts[key] = (counts[key] || 0) + 1;
        // });
        // setConfirmationCounts(counts);
      }

    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    setTotalPages(Math.ceil(allData.length / ITEMS_PER_PAGE));
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = currentPage * ITEMS_PER_PAGE;
    setCurrentData(allData.slice(start, end));
  }, [allData, currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // function getColor(key: string) {
  //   return key == 'Hadir' ? 'green' : key == 'Tidak Hadir' ? 'red' : '#000000';
  // }

  // function getIcon(key: string) {
  //   return key == 'Hadir' ? (<FaCheck color={getColor(key)} />) : key == 'Tidak Hadir' ? (<FaTimes color={getColor(key)} />) : (<FaQuestion color={getColor(key)} />);
  // }

  return (
    <Wrapper>
      {/* <CounterGrid>
        {Object.entries(confirmationCounts).map(([key, value]) => (
          <CounterCard key={key} color={getColor(key)}>
            <IconWrapper color={getColor(key)}>{getIcon(key)}</IconWrapper>
            <Caption color={getColor(key)}>{key}</Caption>
            <Heading1 color={getColor(key)}>{value}</Heading1>
          </CounterCard>
        ))}
      </CounterGrid> */}
      <CardGrid>
        {currentData.map((data) => (
          <CommentCard
            key={data.id}
            username={data.sender}
            time={data.createdAt}
            comment={data.message}
            confirmation={data.confirmation} />
        ))}
      </CardGrid>
      {allData.length > ITEMS_PER_PAGE && <Pagination>
        <PageButton onClick={handlePrev} disabled={currentPage === 1}>Previous</PageButton>
        <PageInfo>Page {currentPage} of {totalPages}</PageInfo>
        <PageButton onClick={handleNext} disabled={currentPage === totalPages}>Next</PageButton>
      </Pagination>}
    </Wrapper>
  );
}

export default CommentList;

const Wrapper = styled.div`
  width: 100%;
`;

// const CounterGrid = styled.div`
//   display: flex;
//   gap: 1rem;
//   justify-content: center;
//   flex-wrap: wrap;
//   margin-top: 1rem;
// `;

// const CounterCard = styled.div<{ color: string }>`
//   background: #fff;
//   border: 2px solid ${({ color }) => color};
//   border-radius: 12px;
//   width: 75px;
//   padding: 10px;
//   // text-align: center;
//   position: relative;
//   box-shadow: 0 2px 6px rgba(0,0,0,0.1);
// `;

// const IconWrapper = styled.div<{ color: string }>`
//   position: absolute;
//   top: -18px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: #fff;
//   border: 2px solid ${({ color }) => color};
//   width: 36px;
//   height: 36px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const CardGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: .2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  align-items: center;
  gap: 1rem;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;

  &:disabled {
    color: #aaa;
    cursor: not-allowed;
    text-decoration: none;
  }

  &:hover:not(:disabled) {
    color: #000;
    text-decoration: underline;
  }
`;

const PageInfo = styled.span`
  color: #000;
  font-size: 0.95rem;
`;

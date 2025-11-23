/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { FaRegCheckCircle, FaRegQuestionCircle, FaRegTimesCircle } from 'react-icons/fa';
import TimeAgo from 'react-timeago';

const CommentCard = ({ username, time, comment, confirmation }: { username: string, time: number, comment: string, confirmation: string }) => {
  return (
    <CardWrapper>
      <Icons>
        {confirmation == 'Hadir' ? (<FaRegCheckCircle color="green" />) : confirmation == 'Tidak Hadir' ? (<FaRegTimesCircle color="red" />) : (<FaRegQuestionCircle color="gray" />)}
      </Icons>
      <Content>
        <TopRow>
          <Username>{username}</Username>
          <Timestamp><TimeAgo date={time} /></Timestamp>
        </TopRow>
        <CommentText>{comment}</CommentText>
      </Content>
    </CardWrapper>
  );
};

export default CommentCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  position: relative;
  gap: 12px;
  overflow: hidden;
  border: 1px solid lightgray;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex-wrap: nowrap;
  gap: 0;
`;


const Username = styled.span`
  color: #1a73e8;
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  text-wrap: wrap;
  text-align: left;
`;


const Timestamp = styled.span`
  color: #555;
  font-size: 0.85rem;
  flex-shrink: 1;
  white-space: nowrap;
  font-style: italic;
`;

const CommentText = styled.p`
  margin: 4px 0 0 0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-wrap: wrap;
  text-overflow: ellipsis;
  text-align: left;
`;


const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #ccc;
`;


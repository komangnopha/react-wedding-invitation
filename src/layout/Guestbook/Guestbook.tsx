import { Heading2 } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import CommentForm from './CommentForm.tsx';
import CommentList from './CommentList.tsx';

const Guestbook = () => {
  return (
    <GuestBookWrapper>
      <Heading2>
        Silahkan tinggalkan pesan untuk kami
      </Heading2>
      <CommentForm />
      <CommentList />
    </GuestBookWrapper>
  );
};

export default Guestbook;

const GuestBookWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

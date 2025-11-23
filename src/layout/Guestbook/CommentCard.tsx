import styled from "@emotion/styled";
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';

// Function to generate a color from a string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const CommentCard = ({ username, time, comment, confirmation }: { username: string, time: number, comment: string, confirmation: string }) => {
  const getConfirmationDetails = (status: string) => {
    switch (status) {
      case 'Hadir':
        return { icon: <FaCheck />, color: '#28a745' };
      case 'Tidak Hadir':
        return { icon: <FaTimes />, color: '#dc3545' };
      default:
        return { icon: <FaQuestion />, color: '#6c757d' };
    }
  };

  const { icon, color } = getConfirmationDetails(confirmation);
  const initial = username ? username.charAt(0).toUpperCase() : '?';
  const avatarColor = stringToColor(username || 'default');

  return (
    <CardContainer>
      <CardHeader>
        <Avatar color={avatarColor}>{initial}</Avatar>
        <UserInfo>
          <Username>{username}</Username>
          <Timestamp>{new Date(time).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}</Timestamp>
        </UserInfo>
        <ConfirmationStatus color={color}>
          {icon}
        </ConfirmationStatus>
      </CardHeader>
      <CommentBody>{comment}</CommentBody>
    </CardContainer>
  );
};

export default CommentCard;

const CardContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 250px; // Fixed width for horizontal scrolling
  flex-shrink: 0;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div<{ color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
`;

const Username = styled.div`
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConfirmationStatus = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ color }) => color};
  background-color: ${({ color }) => `${color}20`};
  padding: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentBody = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9rem;
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: #999;
`;
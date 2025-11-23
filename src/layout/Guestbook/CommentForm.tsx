import styled from '@emotion/styled';
import { push, ref, serverTimestamp } from 'firebase/database';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { realtimeDb } from '../../firebase.ts';

const CommentForm = () => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string | undefined>();
  const options = [
    'Hadir', 'Tidak Hadir', 'Belum Tahu'
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !message || !confirmation) {
      alert('Silahkan tulis nama, pesan, dan konfirmasi anda 🥹');
    } else {
      const guestbookMessage = {
        sender: name,
        message,
        confirmation,
        date: new Date().toLocaleString(),
        createdAt: serverTimestamp(),
      };
      try {
        const guestbookRef = ref(realtimeDb, 'rsvp/gung-hadi-army/');
        push(guestbookRef, guestbookMessage);
        alert('Pesan anda berhasil terkirim 💌');
        setName('');
        setMessage('');
        setConfirmation(undefined);
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Gagal mengirim pesan. Silakan coba lagi.');
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <NameInput
        placeholder="Nama"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MessageInput
        placeholder="Pesan"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ConfirmInput>
        <Dropdown options={options} value={confirmation} onChange={(arg) => setConfirmation(arg.value)} placeholder="Konfirmasi Kehadiran" />
      </ConfirmInput>
      <SubmitButton type="submit">Kirim</SubmitButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: visible;
  align-items: center;
`;

const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1;
  outline: none;
  border: 1px solid #ccc;
  font-family: inherit;
  font-weight: 300;
`;

const MessageInput = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  font-weight: 300;
`;
const ConfirmInput = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 300;
`;

const SubmitButton = styled.button`
  background: #800000;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  padding: 6px 12px;
  line-height: 1.5;
  font-family: inherit;
  font-weight: inherit;
  margin-top: 5px;
`;
export default CommentForm;

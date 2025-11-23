import styled from '@emotion/styled';
import { push, ref, serverTimestamp } from 'firebase/database';
import { ReactNode, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {
  FaCheckCircle,
  FaQuestionCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { realtimeDb } from '../../firebase.ts';

const CommentForm = () => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string | undefined>();
  const options: {
    value: string;
    label: ReactNode;
    className: string;
  }[] = [
      { value: 'Hadir', label: <><FaCheckCircle /> Hadir</>, className: 'hadir' },
      { value: 'Tidak Hadir', label: <><FaTimesCircle /> Tidak Hadir</>, className: 'tidak-hadir' },
      { value: 'Belum Tahu', label: <><FaQuestionCircle /> Belum Tahu</>, className: 'belum-tahu' },
    ];

  const selectedOption = options.find(opt => opt.value === confirmation);

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
      <InputWrapper>
        <label htmlFor="name">Nama</label>
        <NameInput
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="message">Pesan</label>
        <MessageInput
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </InputWrapper>
      <InputWrapper>
        <label>Konfirmasi</label>
        <Dropdown
          className={selectedOption?.className}
          options={options}
          value={confirmation}
          onChange={(arg) => setConfirmation(arg.value)} placeholder="Konfirmasi Kehadiran" />
      </InputWrapper>
      <SubmitButton type="submit">Kirim</SubmitButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: visible;
  align-items: center;

  .Dropdown-root {
    width: 100%;
    font-size: 1rem;
    font-family: inherit;
    font-weight: 300;
  }

  .Dropdown-control {
    border-radius: 4px;
    padding: 8px;
    line-height: 1;
    border: 1px solid #999;
    height: 36px;
    box-sizing: border-box;
  }

  .Dropdown-option {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .Dropdown-placeholder {
    color: #999;
  }

  .Dropdown-option.hadir, .Dropdown-root.hadir .Dropdown-control {
    color: #28a745;
    font-weight: 500;
  }
  .Dropdown-option.tidak-hadir, .Dropdown-root.tidak-hadir .Dropdown-control {
    color: #dc3545;
    font-weight: 500;
  }
  .Dropdown-option.belum-tahu, .Dropdown-root.belum-tahu .Dropdown-control {
    color: #686767ff;
    font-weight: 500;
  }

  .Dropdown-control .Dropdown-option {
    padding: 0;
  }

  .Dropdown-control {
    display: flex;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  

  label {
    color: #333;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
    padding-left: 2px;
  }
`;

const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px;
  font-size: 0.9rem;
  line-height: 1;
  outline: none;
  border: 1px solid #999;
  font-family: inherit;
  font-weight: 300;

  &:focus {
    border-color: #800000;
  }
`;

const MessageInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  outline: none;
  border: 1px solid #999;
  resize: none;
  font-family: inherit;
  font-weight: 300;

  &:focus {
    border-color: #800000;
  }
`;

const SubmitButton = styled.button`
  background: #800000;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  padding: 8px 12px;
  line-height: 1.5;
  font-family: inherit;
  font-weight: inherit;
  margin-top: 5px;
`;
export default CommentForm;

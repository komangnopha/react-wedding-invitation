import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { FiHeart, FiHome, FiImage, FiMapPin, FiMessageCircle } from 'react-icons/fi';

const items = [
  { href: '#home', label: 'Home', icon: <FiHome /> },
  { href: '#wedding', label: 'Wedding', icon: <FiHeart /> },
  { href: '#location', label: 'Lokasi', icon: <FiMapPin /> },
  { href: '#gallery', label: 'Gallery', icon: <FiImage /> },
  { href: '#guestbook', label: 'Guestbook', icon: <FiMessageCircle /> },
];

const BottomNav: React.FC = () => {
  const [activeHref, setActiveHref] = useState(items[0].href);

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.href.substring(1)));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentActive = activeHref;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop) {
          currentActive = `#${section.id}`;
        }
      }

      setActiveHref(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeHref]);

  return (
    <NavWrapper>
      <NavInner>
        {items.map((it) => (
          <NavItem
            key={it.href} href={it.href} aria-label={it.label}
            className={activeHref === it.href ? 'active' : ''}
          >
            <Icon>{it.icon}</Icon>
            <Label>{it.label}</Label>
          </NavItem>
        ))}
      </NavInner>
    </NavWrapper>
  );
};

export default BottomNav;

const NavWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 12px;
  z-index: 80;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const NavInner = styled.div`
  pointer-events: auto;
  width: calc(100% - 32px);
  max-width: 820px;
  background: rgba(255,255,255,0.98);
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(16,24,40,0.08);
  display: flex;
  gap: 6px;
  padding: 8px 10px;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    width: 680px;
  }
`;

const NavItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #1f2937;
  text-decoration: none;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 8px;
  flex: 1 1 0;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &.active {
    color: #800000;
    background-color: rgba(128, 0, 0, 0.1);
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: inline-flex;
`;

const Label = styled.span`
  font-size: 11px;
  line-height: 1;
`;

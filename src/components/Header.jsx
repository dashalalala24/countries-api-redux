import styled from 'styled-components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';

import { Container } from './Container';
import { toggleTheme } from '../store/theme/theme-actions';
import { resetControls } from '../store/controls/controls-actions';

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled(Link).attrs({
  to: '/',
})`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  cursor: pointer;
  text-transform: capitalize;
`;

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  // const theme = 'light';

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleResetControls = () => {
    dispatch(resetControls());
  };
  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title onClick={handleResetControls}>Where is the world?</Title>
          <ModeSwitcher onClick={() => dispatch(toggleTheme(theme === 'light' ? 'dark' : 'light'))}>
            {theme === 'light' ? <IoMoonOutline size='14px' /> : <IoMoon size='14px' />}{' '}
            <span style={{ marginLeft: '0.75rem' }}>{theme} Theme</span>
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
};

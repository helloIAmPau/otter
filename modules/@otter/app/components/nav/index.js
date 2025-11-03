import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import Clickable from '../clickable';
import Container from '../container';

import { wrapper, logo } from './styles.module.css';

export default function Nav() {
  const navigate = useNavigate();

  const onClick = useCallback(function() {
    navigate('/');
  }, [ navigate ]);

  return (
    <Container className={ wrapper } onClick={ onClick }>
      <Clickable className={ logo }>Otter</Clickable>
    </Container>
  );
};

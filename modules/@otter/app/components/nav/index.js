import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import Button from '../button';
import Container from '../container';

import { wrapper, logo } from './styles.module.css';

export default function Nav() {
  const navigate = useNavigate();

  const onClick = useCallback(function() {
    navigate('/');
  }, [ navigate ]);

  return (
    <Container className={ wrapper } onClick={ onClick }>
      <Button className={ logo }>Otter</Button>
    </Container>
  );
};

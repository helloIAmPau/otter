import { Outlet } from 'react-router';

import Nav from '../nav';
import Container from '../container';

import { wrapper, content } from './styles.module.css';

export default function Layout() {
  return (
    <div className={ wrapper }>
      <Nav />
      <Container className={ content }>
        <Outlet />
      </Container>
    </div>
  );
};

import { BrowserRouter, Routes, Route } from 'react-router';

import Layout from '../layout';
import Home from '../home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Home /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

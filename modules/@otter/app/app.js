import { createRoot } from 'react-dom/client';

import App from './components/app';

const domRoot = document.querySelector('#root');
const root = createRoot(domRoot);

root.render(<App />);

import { createRoot } from 'react-dom/client';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';

import App from './components/app';

const domRoot = document.querySelector('#root');
const root = createRoot(domRoot);

root.render(<App />);

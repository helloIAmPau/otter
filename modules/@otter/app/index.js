import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { join } from 'path';

import Page from './components/page';

const app = express();

const fullPath = join(__dirname, 'assets');
app.use('/assets', express.static(fullPath));

app.use('/', function(request, response) {
  const { pipe } = renderToPipeableStream(<Page />, {
    bootstrapScripts: [
      '/assets/app.js'
    ],
    onShellReady: function() {
      response.setHeader('content-type', 'text/html');

      pipe(response);
    }
  })
});

app.listen(80, '0.0.0.0', function() {
  console.log(`${ process.env.service } service listening on http://0.0.0.0`);
});

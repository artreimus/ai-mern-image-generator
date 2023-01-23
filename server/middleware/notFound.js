import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const notFoundMiddleware = (req, res) => {
  // We can setup the status before sending the response
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(
      path.join(
        dirname(fileURLToPath(import.meta.url)),
        '..',
        'views',
        '404.html'
      )
    );
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 not found');
  }
};

export default notFoundMiddleware;

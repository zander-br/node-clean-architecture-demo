import 'module-alias/register';

import app from './config/app';

const port = process.env.PORT || 3333;
app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${port}`),
);

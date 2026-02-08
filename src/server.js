const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const toolRoutes = require('./routes/toolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 40,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Global defaults for shared templates/partials to prevent EJS ReferenceErrors.
app.use((req, res, next) => {
  res.locals.pageTitle = 'DocUtilityHub | Free no-login document tools';
  res.locals.pageDescription =
    'Free, no-login document tools for students, careers, and one-click PDF fixes.';
  next();
});

app.use('/', toolRoutes);

app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle: 'Page not found | DocUtilityHub',
    pageDescription: 'The requested page could not be found. Explore free document tools without login.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
};

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
      }
    });
  } catch (e) {
    req.flash('error', e.message), res.redirect('/register');
  }
};

module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back!');
  redirectUrl = req.session.returnTo || '/campgrounds';
  req.session.returnTo = null;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Goodbye!');
  res.redirect('/campgrounds');
};

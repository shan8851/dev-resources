const checkAdmin = (req, res, next) => {
  console.log('user: ', req.user);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
}

module.exports = { checkAdmin };

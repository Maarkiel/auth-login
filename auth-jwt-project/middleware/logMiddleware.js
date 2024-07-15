const logAction = async (req, res, next) => {
  const { user, action, details } = req.body;

  if (!user || !action || !details) {
      return res.status(200).json({ message: 'Missing required log fields' });
  }

  const logEntry = new Log({
      user,
      action,
      details
  });

  await logEntry.save();

  next();
};
module.exports = logAction;
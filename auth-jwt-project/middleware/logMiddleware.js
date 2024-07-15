const logAction = async (req, res, next) => {
    const { user, action, details } = req.body;
  
    if (!user || !action || !details) {
        return res.status(400).json({ message: 'Missing required log fields' });
    }
  
    const logEntry = new Log({
        user,
        action,
        details
    });
  
    await logEntry.save();
  
    next();
  };
  
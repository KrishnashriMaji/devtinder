const authAdmin = (req, res, next) => {
  if (req.body.token === "XYZ") {
    next(); // middleware
  } else {
    res.status(401).send("Admin is not authorised");
  }
};

const userAdmin = (req, res, next) => {
  if (req.body.token === "XYZ") {
    next(); // middleware
  } else {
    res.status(401).send("Admin is not authorised");
  }
};

module.exports = {
  authAdmin,
  userAdmin,
};

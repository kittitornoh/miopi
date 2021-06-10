// models
const { Users } = require('../models');

exports.getUser = async (req, res) => {
  // database query
  await Users.findOne({
    where: {
      id: req.params.userId,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found.' });
      } else {
        res
          .status(200)
          .send({ first_name: user.first_name, last_name: user.last_name });
      }
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};

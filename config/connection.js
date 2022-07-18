const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/NoSQL-Social-Network_API', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

var local = {
  "port": process.env.OPENSHIFT_NODEJS_PORT || 4011,
  "ip": process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  "mongooseUrl": "mongodb://localhost:27017/survaider"
};

module.exports = local;

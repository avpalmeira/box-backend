const login = '<login>';
const pass = '<pass>';
const cluster = '<cluster>';

// connecting to a mongoDB altas cluster
const connectionString = [
  `mongodb+srv://${login}:${pass}`,
  `@${cluster}.mongodb.net/test?retryWrites=true&w=majority`,
].join('');

module.exports = connectionString;

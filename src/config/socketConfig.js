// configure socket connection
const socketConfig = (io) => {

    // let users be isolated in their own room:
    // frontend must send request to connectRoom
    io.on('connection', (socket) => {
      socket.on('connectRoom', (box) => {
        socket.join(box);
      });
    });
}

module.exports = socketConfig;

export const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('a user connected');

    const emitDinnerList = async () => {
      socket.emit('dinnersList', {});
    };

    emitDinnerList();

    socket.on('get dinners', async (params: any, fn: any) => {
      try {
        fn({});
      } catch (err) {} // tslint:disable-line:no-empty
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

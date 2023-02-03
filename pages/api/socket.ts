import {Server} from 'socket.io'

export default function SocketHandler(req: any, res: any) {
  if (res.socket.server.io) {
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  const onConnection = (socket: any) => {
    socket.on('hello', () => {
      io.to(socket.id).emit('yo', {message: 'hello from server'})
    })

    socket.on('createBoard', () => {
      socket.broadcast.emit('refetchBoardList', {
        message: 'there is new board added',
      })
    })

    socket.on(
      'updateBoard',
      ({boardId, alert = true}: {boardId: string; alert?: boolean}) => {
        socket.broadcast.emit('boardUpdate', {
          boardId,
          alert,
        })
      }
    )

    socket.on('updateComment', ({boardId}: {boardId: string}) => {
      socket.broadcast.emit('commentUpdate', {
        boardId,
      })
    })
  }

  // Define actions inside
  io.on('connection', onConnection)

  console.log('Setting up socket')
  res.end()
}

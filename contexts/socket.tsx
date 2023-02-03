import {useContext, createContext, useState, useEffect, ReactNode} from 'react'
import {io} from 'socket.io-client'

type SocketProviderType = {
  children: ReactNode
}

const SocketContext = createContext({})

export const SocketProvider: React.FC<SocketProviderType> = (props) => {
  const [socket, setSocket] = useState<any>(null)

  const socketInitializer = async () => {
    await fetch('/api/socket')
    setSocket(io())
  }

  useEffect(() => {
    socketInitializer()
  }, [])

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket: (state: any) => setSocket(state),
        clearSocket: () => setSocket(null),
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)

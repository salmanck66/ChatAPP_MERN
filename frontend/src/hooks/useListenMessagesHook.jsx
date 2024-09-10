import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../store/useConversation'
import notisound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useConversation()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shake = true
      const notif = new Audio(notisound)
      notif.play()
      setMessages([...messages, newMessage])
    })

    return () => socket?.off("newMessage")
  }, [socket, setMessages, messages])
}

export default useListenMessages

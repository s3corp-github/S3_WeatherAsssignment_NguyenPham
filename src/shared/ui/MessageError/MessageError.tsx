import './MessageError.css'

interface MessageErrorProps {
  message: string
}

const MessageError = ({ message }: MessageErrorProps) => {
  return message ? <div className="message-error">{message}</div> : null
}

export default MessageError

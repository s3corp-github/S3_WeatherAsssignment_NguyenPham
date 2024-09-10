import './HighLighText.css'
interface HighLightTextProps {
  text: string
}

const HighLightText = ({ text }: HighLightTextProps) => {
  return <span className="highlight-text">{text}</span>
}

export default HighLightText

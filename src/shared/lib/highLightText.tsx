import { HighLightText } from '../ui'

export const highlightText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <HighLightText text={part} key={index} />
        ) : (
          part
        )
      )}
    </>
  )
}

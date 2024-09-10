import React, { useRef, useEffect, ReactNode } from 'react'
interface ClickAwayListenerProps {
  children: ReactNode
  onClickOutside: (el: HTMLElement) => void
  className: string
}
const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  children,
  onClickOutside,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClickOutside(event.target as HTMLElement)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

export default ClickAwayListener

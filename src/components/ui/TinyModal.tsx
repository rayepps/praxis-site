import React, { SyntheticEvent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Pane, Heading, majorScale, IconButton } from 'evergreen-ui'
import { HiX } from 'react-icons/hi'
import theme from 'src/theme'
import { createGlobalStyle } from 'styled-components'

interface Props {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export default function ModalWrapper(props: Props) {
  const [isBrowser, setIsBrowser] = useState(false)

  // Makes sure render only happens in browser
  // not in next ssr
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (isBrowser) {
    const root = document.getElementById('modal-root')
    if (root) {
      return ReactDOM.createPortal(<Modal {...props} />, root) as JSX.Element
    }
  }
  return null
}

const Modal = ({ open = false, onClose, children }: Props) => {
  return !open ? null : (
    <div className="fixed bottom-8 right-8">
      {children}
    </div>
  )
}

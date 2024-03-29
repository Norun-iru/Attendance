import { BrowserMultiFormatReader } from '@zxing/browser'
import { Result } from '@zxing/library'
import { useMemo, useRef } from 'react'
import { useDebounce } from 'react-use'
import React from 'react';

type ScannerProps = {
  onReadCode?: (text: Result) => void
}

export const BarCode = ({ onReadCode }: ScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), [])

  useDebounce(async () => {
    if (!videoRef.current) return
    await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
      if (!result) return
      if (error) {
        console.log('ERROR!! : ', error)
        return
      }
      onReadCode?.(result)
    })
  }, 1000)

  return <video style={{ width: '100%' }} ref={videoRef} />
}
export default BarCode;
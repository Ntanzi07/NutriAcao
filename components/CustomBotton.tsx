'use client'

import { CustomBottonProps } from '@/types'
import React from 'react'

const CustomBotton = ({ title, containerStyles, handleClick, btnType}: CustomBottonProps) => {
  return (
    <button
      disabled={false}
      type= 'button'
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1`}>
        {title}
      </span>
    </button>
  )
}

export default CustomBotton
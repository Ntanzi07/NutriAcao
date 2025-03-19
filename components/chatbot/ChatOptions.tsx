'use client'

import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'

type Props = {
  activedOptions: boolean,
  setOptions: () => void,
}

const ChatOptions = ({ activedOptions, setOptions }: Props) => {

  // const [activedOptions, setActivedOptions] = useState(false);

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-[50px] h-[50px]", // Custom width and height
      userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
      userButtonPopoverActionButton: "", // Custom text color for action buttons
    },
  };
  return (
    <div className={`chatOptions overflow-hidden lg:border-r-2 w-[20rem] ${activedOptions
      ? 'lg:w-[450px] left-0 bg-primary-bg border-r-2'
      : 'lg:left-0 lg:w-0 left-[-20rem]'}`
    } >
      <div className='flex justify-between items-center px-3'>
        <UserButton appearance={userButtonAppearance} />
        <button className={`
          ${activedOptions
            ? 'rotate-180'
            : 'rotate-0'}`
        } onClick={setOptions}>
          <svg width="60" height="60" className="fill-secondary-color" viewBox="0 0 128 128">
            <path d="M58.12,35.88a3,3,0,0,0-4.24,4.24L77.76,64,53.88,87.88a3,3,0,1,0,4.24,4.24l26-26a3,3,0,0,0,0-4.24Z" />
          </svg>
        </button>
      </div>
      <hr className={`bg-secondary-color rounded-full border-none h-[2px] ${activedOptions ? 'inline' : 'lg:inline hidden'}`} />
      <div className={` flex-col gap-3 px-3 ${activedOptions ? 'flex' : 'lg:flex hidden'}`}>
        <div className='rounded-xl border-solid border-[2px] text-nowrap w-full px-2 py-1'>
          chat 1 ok
        </div>
        <div className='rounded-xl border-solid border-[2px] text-nowrap w-fit px-2 py-1'>
          chat 1 ok
        </div>
        <div className='rounded-xl border-solid border-[2px] text-nowrap w-fit px-2 py-1'>
          chat 1 ok
        </div>

      </div>
    </div>
  )
}

export default ChatOptions
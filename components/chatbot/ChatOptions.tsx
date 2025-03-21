'use client'

import { api } from '@/convex/_generated/api'
import { UserButton } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import React, { useState } from 'react'
import DMConversationItem from './DMConversationItem'

type Props = {
  chatid: string | null,
  activedOptions: boolean,
  setOptions: () => void,
}

const ChatOptions = (props: Props) => {

  const conversations = useQuery(api.conversations.get)

  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-[50px] h-[50px]", // Custom width and height
      userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
      userButtonPopoverActionButton: "", // Custom text color for action buttons
    },
  };
  return (
    <div className={`chatOptions overflow-hidden lg:border-r-2 w-[20rem] ${props.activedOptions
      ? 'lg:w-[450px] left-0 bg-primary-bg border-r-2'
      : 'lg:left-0 lg:w-0 left-[-20rem]'}`
    } >
      <div className='flex justify-between items-center px-3'>
        <UserButton appearance={userButtonAppearance} />
        <button className={`
          ${props.activedOptions
            ? 'rotate-180'
            : 'rotate-0'}`
        } onClick={props.setOptions}>
          <svg width="60" height="60" className="fill-secondary-color" viewBox="0 0 128 128">
            <path d="M58.12,35.88a3,3,0,0,0-4.24,4.24L77.76,64,53.88,87.88a3,3,0,1,0,4.24,4.24l26-26a3,3,0,0,0,0-4.24Z" />
          </svg>
        </button>
      </div>
      <hr className={`bg-secondary-color rounded-full border-none h-[2px] ${props.activedOptions ? 'inline' : 'lg:inline hidden'}`} />
      <div className={` flex-col gap-4 px-3 text-nowrap ${props.activedOptions ? 'flex' : 'lg:flex hidden'}`}>
        <div className='flex flex-col'>
          <h3 className='px-2 tracking-[0.2em] text-[1.2em] border-b-2 border-secondary-color mb-1'>Hoje</h3>
          <div className='rounded-lg w-full px-2 py-2 hover:bg-secondary-color'>
            chat 1 ok
          </div>
          <div className='rounded-lg w-full px-2 py-2 hover:bg-secondary-color'>
            chat 1 ok
          </div>
        </div>

        {conversations
          ? conversations.length === 0
            ? <p>Sem conversa</p>
            : conversations.map((conversations) => {
              return <DMConversationItem 
              key={conversations._id} 
              id={conversations._id}
              text={conversations.firstMessage}
              actived={(conversations._id === props.chatid)}
              />
            })
          : <p>carregando...</p>
        }

      </div>
    </div>
  )
}

export default ChatOptions
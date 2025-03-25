import { Id } from '@/convex/_generated/dataModel'
import Link from 'next/link';
import React from 'react'

type Props = {
  id: Id<"conversations">;
  text?: string
  actived: boolean
}

const DMConversationItem = (props: Props) => {

  return (
    <Link href={`/chatbot?id=${props.id}`}
      className={`rounded-lg w-full px-2 py-2 hover:text-primary-bg
      hover:bg-secondary-color transition-all duration-150 
      ${props.actived
          ? 'bg-secondary-color my-1 text-primary-bg'
          : null
        }`
      }
    >
      {props.text ? props.text : "tex"}
    </Link>
  )
}

export default DMConversationItem
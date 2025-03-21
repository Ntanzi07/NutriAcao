import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react';
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
      className={`rounded-lg w-full px-2 py-2 hover:bg-secondary-color ${props.actived ? 'bg-secondary-color' : null}`}>
      {props.text ? props.text : "tex"}
    </Link>
  )
}

export default DMConversationItem
import { Id } from '@/convex/_generated/dataModel'
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

type Props = {
  id: Id<"conversations">;
  text?: string
  actived: boolean
}

const DMConversationItem = (props: Props) => {
  const router = useRouter();
  const deleteMessage = useMutation(api.convertation.deleteConversation);

  const deleteFunc = () => {
    deleteMessage({ conversationId: props.id });
    router.push('/chatbot');
  }

  return (
    <div className={`chatbot__itens 
    ${props.actived
      ? 'bg-secondary-color my-1 chatbot__itens-text-active'
      : null
    }`}>
      <Link href={`/chatbot?id=${props.id}`}
        className={`chatbot__itens-textlink`}>
        <p className='chatbot__itens-text'>{props.text ? props.text : "tex"}</p>
      </Link>
      <button className='chatbot__itens-bututon hover:bg-red-500' onClick={deleteFunc}>
        <svg className='fill-primary-bg p-[5px]' height="25px" width="25px" viewBox="0 0 460.775 460.775">
          <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>
      </button>
      <button className='chatbot__itens-bututon hover:bg-blue-500'>
        <svg className='fill-primary-bg p-[4px]' viewBox="0 0 48 48" width="25px" height="25px">
          <path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 
      C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 
      42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 
      18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 
      5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 
      A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 
      L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 
      L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 
      39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 
      11.037109 31.304688 L 29.111328 13.232422 z"/>
        </svg>
      </button>
    </div>
  )
}

export default DMConversationItem
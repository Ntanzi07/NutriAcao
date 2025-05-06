import { Id } from '@/convex/_generated/dataModel'
import Link from 'next/link';
import React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Dialog } from 'radix-ui';

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

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className='chatbot__itens-button'>
            <Cross2Icon className='text-white w-[25px] h-[25px]'/>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent md:w-[500px] w-[90vw] z-50 py-3 px-5">
            <Dialog.Title className="DialogTitle">Deletar conversa</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Tem certeza que quer excluir sua conversa ?
            </Dialog.Description>

            <div className='flex justify-end gap-3'>
              <Dialog.Close asChild>
                <button className="DialogButton" onClick={deleteFunc}>Sim</button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button className="DialogButton">Não</button>
              </Dialog.Close>
            </div>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default DMConversationItem
import { Avatar, Dialog } from 'radix-ui'
import { Cross2Icon } from "@radix-ui/react-icons";
import React from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

type Props = {}

const UserButton = (props: Props) => {
    const user = useQuery(api.my.get);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className=''>
                    <Avatar.Root className="AvatarRoot">
                        <Avatar.Image
                            className="AvatarImage"
                            src={user?.imageUrl}
                            alt={user?.username}
                        />
                        <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                            {user?.username.charAt(0)}
                        </Avatar.Fallback>
                    </Avatar.Root>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">

                    <Dialog.Title className="DialogTitle">Deletar conversa</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Tem certeza que quer excluir sua conversa ?
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}

export default UserButton
import { Avatar, Dialog } from 'radix-ui'
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { use } from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import UserOptions from './UserOptions/UserOptions';

type Props = {}

const UserButton = (props: Props) => {
    const user = useQuery(api.my.get);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="avatarbutton">
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
                    <div className='flex text-nowrap flex-col items-start'>
                        <h3>{user?.username}</h3>
                        <p>{user?.email}</p>
                    </div>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon className="h-6 w-6 " />
                        </button>
                    </Dialog.Close>
                    <UserOptions user={user}/>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}

export default UserButton
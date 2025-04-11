import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Avatar, Dialog } from 'radix-ui'
import React from 'react'

type Props = {}

const UserPage = (props: Props) => {
    const user = useQuery(api.my.get);
    
    return (
        <div className='px-5 py-3 w-[600px]'>
            <div className='flex items-center gap-2'>
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
                <div className='leading-[1.2rem]'>
                    <p>Hello,</p>
                    <Dialog.DialogTitle className='text-[1.2em]'>{user?.username}</Dialog.DialogTitle>
                </div>
            </div>
        </div>
    )
}

export default UserPage
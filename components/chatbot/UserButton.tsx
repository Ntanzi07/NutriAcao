import { Avatar, Dialog } from 'radix-ui'
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import React, { use, useEffect, useRef, useState } from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/nextjs';

type Props = {}

const UserButton = (props: Props) => {
    const user = useQuery(api.my.get);
    let userName = user?.username;

    if(user){
        const userNameParts = user.username.split(" ")
        userName = userNameParts[0] + " " + userNameParts[1]
    }

    const { signOut, openUserProfile } = useClerk();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
          ) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block w-full ">
            <button onClick={handleToggle} className="avatarbutton">
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
                <div className="relative flex flex-col">
                    <h3 className=''>{userName}</h3>
                    <p className=''>{user?.email}</p>
                </div>
            </button>

            {isOpen && (
                <div className="absolute left-0 bottom-[calc(100%+5px)] mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        <button
                            onClick={() => {
                                openUserProfile();
                                handleClose();
                            }}
                            className="flex gap-2 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                            <GearIcon/>
                            Manage Account
                        </button>
                        <button
                            onClick={() => {
                                signOut();
                                handleClose();
                            }}
                            className="flex gap-2 items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                            <PersonIcon />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserButton
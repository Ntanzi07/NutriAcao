'use client'

import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useTransitionRouter } from "next-view-transitions"
import Image from 'next/image'


type Props = {
    id: string,
    contentHtml: string,
    title: any,
    date: string,
    category: any,
    img: any,
}

const ArticleBlog = (props: Props) => {

    const router = useTransitionRouter();

    function slideInOut() {
        document.documentElement.animate([
            {
                opacity: 1,
                transform: "translateY(0)",
            },
            {
                opacity: 0,
                transform: "translateY(35%)",
            }
        ], {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        });

        document.documentElement.animate([
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // start (flat at top)
            },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" // end (full height)
            },
        ], {
            duration: 1500,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
        }
        )
    }
    return (
        <div className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5 text-white">
            <div className="flex justify-between font-STIX text-[1.3em]">
                <a onClick={(e) => {
                    e.preventDefault()
                    router.push(`/blog`, {
                        onTransitionReady: slideInOut,
                    })
                }}
                    className="flex flex-row gap-1 place-items-center"
                    href={`/blog`}>
                    <ArrowLeftIcon width={20} height={20} />
                    <p>back to blog</p>
                </a>
                <p>{props.date.toString()}</p>
            </div>
            <div className='relative w-full h-[400px] rounded-3xl'>
                <Image src={`/${props.img}`} alt={`${props.img}`} fill className='object-cover' />
            </div>
            <article className="article" dangerouslySetInnerHTML={{__html: props.contentHtml}} />
        </div>
    )
}

export default ArticleBlog
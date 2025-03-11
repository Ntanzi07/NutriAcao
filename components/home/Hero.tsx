'use client'

import Image from "next/image"
import CustomButton from "../CustomButton"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__text-container">
        <h1 className="hero__title">
          Descubra um novo você com <b>NutriAção</b>
        </h1>
        <p className="hero__subtitle">
          Explore como uma alimentação balanceada pode transformar sua saúde e bem-estar
        </p>
        <Link href="/quemSomos">
          <CustomButton
            title="Saiba Mais"
            containerStyles="bg-secondary-color text-white mt-10 py-3 px-6"
            handleClick={() => { }}
          />
        </Link>
      </div>
      <div className="hero__video-container">
        <video src={require('../../public/videos/heroVideo.mp4')} autoPlay muted playsInline disablePictureInPicture loop className="hero__video" />
      </div>
    </div>
  )
}

export default Hero
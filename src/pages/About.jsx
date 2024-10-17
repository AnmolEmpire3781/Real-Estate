import React from 'react'
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; 
import { TiSocialInstagram, TiSocialLinkedin, TiSocialGithub } from 'react-icons/ti'; 

export default function About() {
  return (
    <div className='py-20 px-4 mx-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800 '>About Indian Estate</h1>
      <p className='mb-4 text-slate-700'>Indian Estate is a leading real estate agency that specialiazes in helping clients buy, sell , and rent properties in the most desirable neighbourhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible</p>

      <p className='mb-4 text-slate-700'>
        Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell or rent a property we are here to help you every step of the way.
      </p>

      <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each annd every one of our clients.</p>



      {/* Developed by Section */}
      <div className="bg-gray-200 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-2"><span className='font-semibold'>Developed by : </span>   <span className='text-slate-700'>Divyansh Pandey</span></h2>
          <div className="flex items-center space-x-4">
            
            <a target="_blank" href="www.linkedin.com/in/divyansh-pandey-534996220" className="text-gray-700 hover:text-gray-900 flex items-center">
              <TiSocialLinkedin className="w-6 h-6 mr-1" />
              LinkedIn
            </a>
            <a target="_blank" href="https://github.com/pandeydivyansh1803" className="text-gray-700 hover:text-gray-900 flex items-center">
              <TiSocialGithub className="w-6 h-6 mr-1" />
              GitHub
            </a>
            <a target="_blank" href="https://www.instagram.com/pandeydivyansh1803/" className="text-gray-700 hover:text-gray-900 flex items-center">
              <TiSocialInstagram className="w-6 h-6 mr-1" />
              Instagram
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

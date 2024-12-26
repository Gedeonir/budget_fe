import React from 'react'
import { RiAddCircleFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import GovernmentLogo from '../assets/Govt.png';
import { IoWallet } from "react-icons/io5";

const Banner = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const QuickLinks = [
    {
      "Icon": <RiAddCircleFill size={20} />,
      "label": "New budget",
      "to": location.pathname.includes("dashboard") ? "/dashboard/plan-budget" : "/plan-budget"
    },
    //   {
    //     "Icon":<MdPrivacyTip size={20}/>,
    //     "label":"Privacy & Policy",
    //   },
    //   {
    //     "Icon":<FaQuestionCircle size={20}/>,
    //     "label":"FAQ",
    //   },
    //   {
    //     "Icon":<IoIosPeople size={20}/>,
    //     "label":"HR team",
    //   },
    {
      "Icon": <IoWallet size={20} />,
      "label": "My budgets",
      "to": location.pathname.includes("dashboard") ? "/dashboard/my-budgets" : "/my-budgets"
    },
  ]


  return (
    <div className='py-4 font-bold text-text_primary flex justify-start items-center gap-4 mb-4'>
      <div className='w-40 hidden lg:block'>
        <img src={GovernmentLogo} className='w-full h-full object-cover' />
      </div>
      <div className='w-full'>
        <div className='py-4 font-bold text-secondary w-full overflow-x-hidden'>
          <p>{props?.institution?.getProfile?.institution?.institutionName}</p>
        </div>
        <div className='mb-3'>
          <p className='text-sm font-normal text-wrap text-justify'>Budget planning and implementation system is computerized system that helps government institutions to plan their budget and monitor the budget execution </p>
        </div>
        {props?.institution?.getProfile?.position?.toLowerCase() === 'budget officer' && (
          <div className='lg:flex grid grid-cols-3 justify-start items-center lg:gap-4 flex-wrap'>
            {QuickLinks.map((item, index) => {
              return (
                <div key={index} className='group flex justify-start items-center gap-2 text-sm' onClick={() => navigate(item.to)}>
                  <div className='my-2 group-hover:bg-list_hover mb-2 lg:mx-auto p-2 w-8 h-8 rounded-full border flex items-center justify-center text-primary2 bg-secondary  duration-200 delay-100 cursor-pointer'>
                    {item.Icon}
                  </div>
                  <div className='text-xs group-hover:text-list_hover text-secondary '>{item.label}</div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>)
}

export default Banner
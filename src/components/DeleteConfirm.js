import React from 'react'
import { connect } from 'react-redux'
import { deleteInstution } from '../redux/Actions/InstitutionActions'
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const DeleteConfirm = (props) => {
    const [loading,setLoading]=React.useState(false);
    

  return (
    <div className='py-4 px-4 mx-auto top-1/4 left-0 right-0 lg:w-2/4 bg-primary rounded-lg shadow-lg absolute'>
        <p className='text-text_primary text-sm'>Are you sure you want to {props.action? props.action:`delete this ${props.item}`}</p>
        <div className='flex justify-start gap-4 w-full'>
            <button type='reset' size="sm" className=' my-4 text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>props.setDelete({id:"",open:false})}>No</button>
            <button onClick={()=>props.handleDelete(props?.Delete?.id)} type='submit' size='sm' className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                {props?.data?.deleteInst?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Deleting</span></p>:'Yes'}
            </button>
        </div>

    </div>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{deleteInstution}) (DeleteConfirm)
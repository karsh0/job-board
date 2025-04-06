"use client"

import { useEffect } from "react"
import { addSkills, InitUserId } from "../../../actions/user.action"

export default function Dashboard(){
    useEffect(()=>{
        //fix this
        async function main(){
            await InitUserId()
        }
        main()
    },[])    
    return <div>
        Dashboard
    </div>
}
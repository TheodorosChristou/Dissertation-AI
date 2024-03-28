import React, { useState } from 'react';
import axios from "axios";
import {useMutation} from "react-query";
import FadeInDiv from '../components/FadeInDiv';
import {useSession} from "next-auth/react"
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';


export default function Index(){
    
    const{data: session} = useSession();

    const valid = session

    let user, role;
    
    if (session?.user?.name?.toString()) {
      user = session.user.name;
      role = session.user.role;
    }

      if(valid){
         return(
         <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Welcome!</h1>
        </div>)
      }else{
        return <div className="flex items-center justify-center"><FadeInDiv><div className="container mx-auto my-8 p-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Unauthorized!</h1>
        <p>This page cannot be accessed without logging in!.</p>
      </div></FadeInDiv></div>

      }

}
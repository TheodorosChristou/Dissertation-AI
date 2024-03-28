import React, { useState } from 'react';
import AddPhotoForm, {FormValues} from "../components/AddPhotoForm"
import axios from "axios";
import {useMutation} from "react-query";
import {useSession} from "next-auth/react"
import FadeInDiv from '../components/FadeInDiv';



export default function Uploading(){

    const{data: session} = useSession();

    const valid = session
    const redirect = (url, asLink = true) =>
    asLink ? (window.location.href = url) : window.location.replace(url);

    const [validation, setValidation] = useState(true);

    var validate: Boolean

  
    const {isLoading, isSuccess, isError, mutate} = useMutation( async(photoform: FormValues) =>{

            console.log("creating new entry")
            await axios.post("/api/upload/", photoform);
            redirect("/Upload");

      });

      if(valid){
        return <div><div className="text-white mt-5"><AddPhotoForm
        isLoading={isLoading}
      onSubmit={(photoform) => mutate(photoform)}
      />  </div> <div className="text-white mt-5 flex justify-center">{!validation && (<h1 className="text-white">Falied to Upload</h1>)}</div></div>;
      }else{
        return <div className="flex items-center justify-center"><FadeInDiv><div className="container mx-auto my-8 p-8 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Unauthorized!</h1>
        <p>This page cannot be accessed without logging in!.</p>
      </div></FadeInDiv></div>

      }

}
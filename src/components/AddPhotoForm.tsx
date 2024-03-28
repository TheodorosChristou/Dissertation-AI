import {useEffect} from "react";
import {CloudUploadIcon, TrashIcon} from "@heroicons/react/outline";
import {SubmitHandler, useForm} from "react-hook-form";
import FieldValidation from "./FieldValidation";
import {thumbnail} from "@cloudinary/url-gen/actions/resize"
import { AdvancedImage } from "@cloudinary/react";
import useCloudinary from "@/hooks/useCloudinary";
import { useState } from "react";

export interface WorksheetFormProps {
  onSubmit: SubmitHandler<FormValues>;
  isLoading?: boolean;
  triggerReset?: boolean;
  values?: FormValues;
  label?: string;
}

export interface FormValues {
    _id?: string;
    Label: string;
    Photos: [];
  }


export default function AddPhotoForm(props){


    var valid = true

    const {Cloudinary} = useCloudinary();



    const handleUpload = () => {
      if (
        !process.env.NEXT_PUBLIC_CLOUDINARY_NAME ||
        !process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
      ) {
        console.error(`in order for image uploading to work 
        you need to set the following environment variables: 
        NEXT_PUBLIC_CLOUDINARY_NAME  and NEXT_PUBLIC_CLOUDINARY_PRESET`);
      }
  
      // eslint-disable-next-line
      // @ts-ignore
      const imageWidget = cloudinary.createUploadWidget(

        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
          sources: ["local", "camera"],
        },
        (error, result) => {
          if (error) {
            console.error(error);
          }
          if(result.event === "success"){
            console.log("Image uploaded, result information:", result.info)
            setIcon(result.info.public_id)
          }
        }
      );
  
      imageWidget.open();
    };
  

    const {onSubmit, triggerReset, values, label} = props;
    const {register,  handleSubmit, formState:{errors}, reset} = useForm<FormValues>({
        defaultValues: {...values},
      });

      useEffect(() => {
        if (triggerReset) {
          setIcon("");
          reset();
        }
      }, [triggerReset, reset]);


      const [icon, setIcon] = useState(values?.Photos ? values?.Photos[0] : null);

      
      
    return(
    <div  className="flex justify-center">
    <div className="flex flex-col space-y-3 bg-gray-600	 p-7 rounded-lg max-w-[80%] mx-auto">
        <h3 className="text-lg text-center mb-2 font-bold underline underline-offset-4"> Photo Upload Form</h3>
        <div>
        </div>
        <form
        onSubmit={handleSubmit((data)=>{
            onSubmit({...data, ...{Photos: [icon]}})
            console.log(data)
        })}>
            <div className="pt-5 flex justify-center pb-5">
            <a data-testid='uploadPhoto'className="gray-outline-button" onClick={(handleUpload)}><CloudUploadIcon className="h-5 w-5"/>Upload</a>
            </div>
            <div>
            <label className="font-semibold ml-2"> Predicted Label</label>
            <input data-testid='DescTest'
            {...register("Label", FieldValidation(valid))}
            className="border-2 rounded-md p-2 ml-2 text-black w-full"
            type="string"
            maxLength={50}
            placeholder="Description"
            />
            <p>{errors.Label?.message}</p>
            </div>
            {(icon && (
              <>
            <div className="pt-5 flex justify-center">
              <TrashIcon className="w-5 h-5 cursor-pointer" onClick={() => setIcon(null)}/>
              <AdvancedImage data-testid="returnValue"className="border-2 border-black mr-1" cldImg={Cloudinary.image(icon).resize(thumbnail().width(200).height(200))}/> 
            </div>
            </>
            ))}
            <div className=" flex justify-center">
                <div className="flex justify-center mt-5 bg-black text-white rounded-full w-full">
                <button data-testid="submitButton"className="bg-black text-white bg rounded-full py-1 px-1 xs:px-3 sm:px-3 font-semibold">Submit</button>
                </div>
            </div>
        </form>

        </div>
</div>
    );
}
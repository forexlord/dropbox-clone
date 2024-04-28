"use client" 
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import DropzoneComponent from "react-dropzone";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function DropZone() {
    const[loading,setLoading] = useState(false)
    const{isLoaded, isSignedIn, user}= useUser()
  const maxSize = 20971520;

  const onDrop =(acceptedFiles: File[])=>{
    acceptedFiles.forEach(file =>{
        const reader = new FileReader();
        reader.onabort = ()=>console.log('file reading was aborted');
        reader.onerror = ()=>console.log('the was an error reading file');
        reader.onload = async()=>{
            await uploadPost(file)
        }
        reader.readAsArrayBuffer(file)
    })
  }

  const uploadPost = async(selectedFile:File)=>{
    if(loading)return;
    if(!user) return;
    setLoading(true)
    const toastId = toast.loading('Uploading...')
    const docRef = await addDoc(collection(db,'users',user.id,'files'),{
        userId: user.id,
        fileName: selectedFile.name,
        fullName:user.fullName,
        timestamp: serverTimestamp(),
        type: selectedFile.type,
        size:selectedFile.size
    })

    const imageRef = ref(storage,`users/${user.id}/files/${docRef.id}`)
    uploadBytes(imageRef,selectedFile).then(async(snapshot)=>{
        const downloadURl =await getDownloadURL(imageRef)

        await updateDoc(doc(db,'users',user.id,'files',docRef.id),{
            downloadURl:downloadURl, 
        })
    })
    .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle upload error (e.g., show user notification)
      });
      toast.success('Upload successfully',{
        id:toastId
      })  
    setLoading(false)
  }

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
        isDragReject,
      }) =>{ 
        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize
        return(
        <section className="m-4">
          <div {...getRootProps()}
          className={cn(
            "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
            isDragActive? "bg-[#035ffe] text-white animate-pulse":"bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
          )}
          >
            <input {...getInputProps()} />
            {!isDragActive && "click here or drop a file upload"}
            {isDragActive && !isDragReject && "drop to upload this file"}
            {isDragReject && "file type not supported"}
            {isFileTooLarge && (
              <div className="text-danger mt-2">File is too large</div>
            )}
          </div>
        </section>
  )}}
    </DropzoneComponent>
  );
}

export default DropZone;

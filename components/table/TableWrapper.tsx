'use client'
import { FileType } from "@/typings"
import { Button } from "../ui/button"
import { DataTable } from "./Table";
import { columns } from "./columns"
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton"


function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
    const{ user}= useUser()
    const[initialFiles, setInitialFile]=useState<FileType[]>([])
    const[sort,setSort]= useState<'asc'|'desc'>('desc')

    const[docs,loading,error]=useCollection(
        query(
            collection(db, 'users', user!.id, 'files'),
            orderBy('timestamp',sort)
        )
    )

    useEffect(()=>{
        if(!docs)return;
        const files:FileType[] = docs.docs.map(doc=>({
            id: doc.id,
            fileName: doc.data().fileName || doc.id,
            fullName: doc.data().fullName,
            timestamp:new  Date(doc.data().timestamp?.seconds * 1000) || undefined,
            downloadURL: doc.data().downloadURl,
            type: doc.data().type,
            size: doc.data().size,
        }))
        setInitialFile(files)
    },[docs])
    if(docs?.docs.length=== undefined){
        return(
            <div>
                <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
                    <Skeleton className="h-5 w-full"/>
                </Button>
                <div className="border rounded-lg">
                    <div className="border-b h-12"/>
                    {skeletonFiles.map((files)=>(
                        <div key={files.id} className="flex items-center space-x-4 p-5 rounded-lg">
                            <Skeleton className="h-12 w-12"/>
                            <Skeleton className="h-12 w-full"/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button 
      className="ml-auto w-fit"
      variant={"outline"}
      onClick={()=>{setSort(sort==='desc'?'asc':'desc')}}
      >Sort by {sort==='desc'?'Newest':'Oldest'}</Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper
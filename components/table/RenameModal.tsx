'use client'
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { Input } from "../ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import toast from "react-hot-toast"



function RenameModal() {
    const[input, setInput]=useState('')
    const{user}=useUser()
    const [
        fileId,
        filename,
        setIsDeleteModalOpen,
        setIsRenameModalOpen,
        isRenameModalOpen
       ]= useAppStore(state=>[
       state.fileId, 
       state.filename,
       state.setIsDeleteModalOpen,
       state.setIsRenameModalOpen,
       state.isRenameModalOpen
     ])

     const renameFile = async()=>{
        if(!user || !fileId) return;
        const toastId = toast.loading('renaming...')
        await updateDoc(doc(db,'users',user.id,'files',fileId),{
            fileName: input
        })
        toast.success("Rename successful",{
          id:toastId
        })
        setInput('')
        setIsRenameModalOpen(false)
     }
  return (
    <Dialog
    open={isRenameModalOpen}
    onOpenChange={(opened)=>{
        setIsRenameModalOpen(opened)}}
    >
    
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="pb-2">Edit FileName</DialogTitle>
      </DialogHeader>
  
          <Input
            id="link"
            defaultValue={filename}
            className="col-span-3"
            onChange={e => setInput(e.target.value)}
            onKeyDownCapture={e =>{
                if(e.key === 'Enter'){
                    renameFile()
                }
            }}
          />

        <div className="flex justify-end space-x-2 py-3">
        <Button type="submit"
        size='sm'
        variant={'ghost'}
        className="px-3"
        onClick={()=> setIsRenameModalOpen(false)}
        >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
        </Button>

        <Button type="submit"
        size='sm'
        variant={'ghost'}
        className="px-3"
        onClick={()=> renameFile()}
        >
            <span className="sr-only">Save changes</span>
            <span>Save changes</span>
        </Button>
          
        </div>
    </DialogContent>
  </Dialog>
  )
}

export default RenameModal
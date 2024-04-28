'use client'

import { Button } from "@/components/ui/button"
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
import { db, storage } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import toast from "react-hot-toast"

export function DeleteModal() {
    const{user}= useUser()
    const [
        setFileId,
        fileId,
        setIsDeleteModalOpen,
        isDeleteModalOpen
       ]= useAppStore(state=>[
       state.setFileId, 
       state.fileId,
       state.setIsDeleteModalOpen,
       state.isDeleteModalOpen,
     ])

     async function deleteFile() {
        if(!user || !fileId) return;
        const toastId = toast.loading('Deleting file...')
        const fileRef = ref(storage,`users/${user.id}/files/${fileId}`)

       await deleteObject(fileRef).then(async()=>{
        deleteDoc(doc(db,'users',user.id,'files',fileId)).then(()=>{
            toast.success('Deleted successfully',{
              id:toastId
            })   
        })
        })
        setIsDeleteModalOpen(false)
     }
  return (
    <Dialog
    open={isDeleteModalOpen}
    onOpenChange={(opened)=>{
        setIsDeleteModalOpen(opened)
    }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete</DialogTitle>
          <DialogDescription>
            this action cannot be undone. Your file will be deleted permanently
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
            <Button
            size='sm'
            type="submit"
            className="px-3 flex-1"
            variant={'ghost'}
            onClick={()=>{setIsDeleteModalOpen(false)}}
            >
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>

            <Button
            size='sm'
            type="submit"
            className="px-3 flex-1"
            variant={'destructive'}
            onClick={()=>{deleteFile()}}
            >
                <span className="sr-only">Delete</span>
                <span>Delete</span>
            </Button>
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

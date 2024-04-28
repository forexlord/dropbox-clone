import { create } from "zustand";

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen:(open:boolean)=>void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen:(open:boolean)=>void;

    fileId: string | null;
    setFileId: (fieldId: string)=>void;

    filename:string;
    setFileName:(fileName:string)=> void;
}

export const useAppStore = create<AppState>()((set) => ({
  fileId: null,
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  filename: '',
  setFileName: (filename: string) => set((state) => ({ filename })),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open) => set((state) => ({ isRenameModalOpen: open }))
}))

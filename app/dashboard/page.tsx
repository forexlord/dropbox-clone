import DropZone from "@/components/DropZone";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs/server";
import { collection, doc, getDocs } from "firebase/firestore";
import TableWrapper from "@/components/table/TableWrapper";

const Dashboard = async() => {
 const{ userId} =auth()

 const docsResult = await getDocs(collection(db, 'users', userId!, 'files'));
 const skeletonFiles:FileType[]= docsResult.docs.map((doc) => ({
   id: doc.id,
   fileName: doc.data().fileName || doc.id,
   fullName: doc.data().fullName,
   timestamp:new  Date(doc.data().timestamp?.seconds * 1000) || undefined,
   downloadURL: doc.data().downloadURl,
   type: doc.data().type,
   size: doc.data().size,
 }))
 console.log(docsResult.docs);
 
 console.log(skeletonFiles);
 

  return <div className="border-t"> 
   <DropZone/>

   <section className="container space-y-5">
      <h2 className="font-bold">All files</h2>

      <div>
          <TableWrapper
          skeletonFiles={skeletonFiles}
          />
      </div>
   </section>
  </div>;
};
export default Dashboard;
import { UserButton } from "@clerk/nextjs";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1e1919] dark:bg-slate-800 h-full p-10">
      <div className="p-10 flex flex-col bg-[#2b2929] dark:bg-slate-800 text-white space-y-5">
        <h1 className="text-5xl font-bold">
          Welcome to Reedzdropbox-clone <br/>
          <br/>
          Everything you and your business need to work efficiently, all in one place
        </h1>
        <p className="pb-20">
        Collaborate seamlessly and deliver work faster from anywhere with Dropbox. Securely store your content, edit PDFs, share videos, sign documents and track file engagement—without leaving Dropbox.
        </p>
        <Link href='/dashboard' className="flex bg-blue-500 p-5 w-fit rounded-[5px]">
          Try it for free!
          <ArrowRight className="ml-10"/>
        </Link>
      </div>
      <div className="bg-[#1e1919] dark:bg-slate-800 h-full p-10">
        <video autoPlay loop muted className="">
           <source 
           src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
           type=""
           />
        </video>
      </div>
      </div>
    </main>
  );
}

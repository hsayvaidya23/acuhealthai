"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Settings,
} from "lucide-react";
import { ModeToggle } from "@/components/modetoggle";
import { useState } from "react";
import ReportComponent from "@/components/ReportComponent";
import { toast } from "sonner";
import ChatComponent from "@/components/chatcomponent";

const Home = () => {

  const [reportData, setreportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast('Updated!');
  }

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] bg-background items-center gap-1 border-b px-4">
          <h1 className="text-3xl leading-7 font-bold">
            <span className="flex flex-row bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
              AcuHealth_AI
            </span>
          </h1>
          <div className="w-full flex flex-row justify-end gap-2">
            <ModeToggle />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings />
                  <span className="sr-only">Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4
        md:grid-cols-2
        lg:grid-cols-3"
        >
          <div
            className="hidden md:flex flex-col"
          >
            <ReportComponent onReportConfirmation={onReportConfirmation} />
            {/* <SideComponent onReportConfirmation={onReportConfirmation} /> */}
          </div>
          <div
            className="lg:col-span-2"
          >
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
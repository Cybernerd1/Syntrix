import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SideBarFooter from "./SideBarFooter";
import codewave from "../../public/CodeWave2.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";

function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image src={codewave} alt="logo" height={40} />
        <Button className="mt-3">
          
          <MessageCircleCode /> Start new chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5 ">
        <WorkspaceHistory />
        <SidebarGroup />
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;

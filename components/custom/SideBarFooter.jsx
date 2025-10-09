import { Ghost, HelpCircle, LogOutIcon, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SideBarFooter = () => {
  const router = useRouter();
  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOutIcon,
    },
  ];

  const onOptionClick = (option) => {
    router.push(option?.path);
  };
  return (
    <div className="flex flex-col w-full gap-1">
      {options.map((option, index) => (
        <Button
          key={option.name}
          variant="ghost"
          className="w-full flex justify-start"
          onClick={()=>onOptionClick(option)}
        >
          <option.icon /> {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Power } from "lucide-react";
import { logout } from "@/app/login/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

function Navbar() {
  const supabase = createClient();
  const [session, setSession] = useState<any>();

  useEffect(() => {
    async function getSession() {
      const sess = await supabase.auth.getSession();
      setSession(sess);
    }

    getSession();
  }, []);

  console.log("navbar rendered from cilent side");
  return (
    <div className="flex h-12 items-center justify-end px-8 border-b gap-6 z-40 ml-[270px] bg-gradient-to-r from-slate-50 via-blue-100 to-slate-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
            <Bell size={20}></Bell>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Notifications</h4>
              <p className="text-sm text-muted-foreground">
                No new notifications.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full border">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/avatar.png" alt="img" />
              <AvatarFallback>NN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Nikhil</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.data.session?.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Others</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex gap-1"
            onClick={() => {
              logout();
            }}>
            <span>
              <Power size={15}></Power>
            </span>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default Navbar;

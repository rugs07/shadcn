import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";
import { Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Homepage = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="p-2 flex items-center: gap-2">
        <div>
          <Button
            className={
              "rounded-none cursor-pointer bg-[#fff] text-[#000] border border-black hover:bg-[#EEE] px-8"
            }
          >
            Click me
          </Button>
        </div>

        <div>
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="border border-[#EEE] rounded-none"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </div>

        <div>
          <Input
            type={"email"}
            placeholder="Email"
            className={"focus:!ring-0 rounded-none"}
          />
        </div>

        <div className="bg-[#EEE] p-1 px-3">
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="bg-[#EEE] p-1 px-4 cursor-pointer">
          <AlertDialog>
            <AlertDialogTrigger className="cursor-pointer">
              Alert Dialog Box
            </AlertDialogTrigger>
            <AlertDialogContent className={""}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={"bg-[#EEE] rounded-none"}>Navigation</NavigationMenuTrigger>
                <NavigationMenuContent className={"p-0"}>
                  <NavigationMenuLink className={"cursor-pointer p-2"}>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

      </div>
      <div className="mt-2 p-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className={"max-w-[300px]"}>
            <AccordionTrigger className={"bg-[#EEE] p-2"}>
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className={"max-w-[300px]"}>
            <AccordionTrigger className={"bg-[#EEE] p-2 mt-2"}>
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Homepage;

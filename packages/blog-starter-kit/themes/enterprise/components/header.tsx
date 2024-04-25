import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Navbar, Collapse, IconButton, Button } from "@material-tailwind/react";
import Logo from "./newlogo.png"
import Custom from './dropDown';
import SearchLayer from './searchBox';

import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";


const links = [
	{ name: "Home", href: "/main" },
	{
	  name: "About Us",
	  href: "/main/about",
	  submenu: true,
	  submenuItems: [{ name: "Founder", href: "/main/founder" }],
	},
	{
	  name: "Resources",
	  href: "/main/resources",
	  submenu: true,
	  submenuItems: [{ name: "Articles", href: "/articles" }],
	},
	{ name: "Contact Us", href: "/main/contacts" },
  ];
export const Header = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';


	useEffect(() => {
		window.addEventListener(
		  "resize",
		  () => window.innerWidth >= 1060 && setOpen(false)
		);
	  }, []);
	return (
	<header>
			<div className="border-b border-2  flex justify-between pl-10 pr-10 align-middle py-5">
		<Image src={Logo} height={200} width={300} alt="" className='w-28'/>

		<div className='w-full relative '>
		<div className="hidden lg:flex">

		 <div className='w-fit mt-3'>
			<ul className='flex justify-center align-bottom space-x-6  text-2xl mr-6'>
				{links.map((link, idx)=> 
				 link.name == "Resources" ? (
					<Custom key={8} />
				  ) : <li key={idx} className='mt-2'>
					<Link href={link.href} >{link.name}</Link>
				</li>)}
			</ul>
		 </div>
		 <Link
            href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
            target="_blank"
            rel="noreferrer"
			className='bg-abcf h-fit text-black rounded-lg font-bold uppercase px-6 py-2 mt-3'
          >
              Donate
          </Link>
        </div>
		
		{/* <IconButton
          variant="text"
          color="white"
          onClick={handleOpen}
          className="ml-52 absolute right-3 lg:hidden "
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6 text-black mr-3" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6 text-black mr-8" />
          )}
        </IconButton> */}
			</div>
		</div>
	
	</header>
	);
};

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { Navbar, Collapse, IconButton, Button } from "@material-tailwind/react";
import Logo from "./newlogo.png"
import Custom from './dropDown';


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
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

	

	return (
		<header className="border-b border-2  flex justify-between pl-10 pr-10 align-middle py-5">
		<Image src={Logo} height={200} width={300} alt="" />

		<div>
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
			className='bg-abcf text-black rounded-lg font-bold uppercase px-6 py-3'
          >
              Donate
          </Link>
        </div>
			</div>
		</header>
	);
};

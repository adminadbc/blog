import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { Navbar, Collapse, IconButton, Button } from "@material-tailwind/react";
import Logo from "./newlogo.png"

export const Header = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

	

	return (
		<header className="border-b border-2  flex justify-between pl-10 pr-10 align-middle py-5">
		<Image src={Logo} height={200} width={300} alt="" />

		<div>
		<div className="hidden lg:flex">
          <Link
            href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bg-abcf text-black px-10 py-3 rounded-md" size="lg">
              Donate
            </Button>
          </Link>
        </div>
			</div>
		</header>
	);
};

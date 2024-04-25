import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import Image from 'next/image';
import { PublicationNavbarItem } from '../generated/graphql';
import Logo from "./newlogo.png"

export const Header = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

	

	return (
		<header className="border-b border-2 flex pl-10 py-5">
		{/* <Image src={Logo} height={200} width={300} alt="" /> */}
		header
		</header>
	);
};

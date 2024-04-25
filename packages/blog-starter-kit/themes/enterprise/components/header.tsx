'use client';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Collapse, IconButton, Navbar } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Custom from './dropDown';

import clsx from 'clsx';

import { FaInstagramSquare } from 'react-icons/fa';
import { FaLinkedin, FaSquareFacebook } from 'react-icons/fa6';

const links = [
	{ name: 'Home', href: '/main' },
	{
		name: 'About Us',
		href: '/main/about',
		submenu: true,
		submenuItems: [{ name: 'Founder', href: '/main/founder' }],
	},
	{
		name: 'Resources',
		href: '/main/resources',
		submenu: true,
		submenuItems: [{ name: 'Articles', href: '/articles' }],
	},
	{ name: 'Contact Us', href: '/main/contacts' },
];
export const Header = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	const pathname = usePathname();

	React.useEffect(() => {
		window.addEventListener('resize', () => window.innerWidth >= 1060 && setOpen(false));
	}, []);
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	return (
		<Navbar
			fullWidth
			shadow={false}
			color="transparent"
			className="overflow-x-hidden-hidden absolute z-50 w-screen border-0 bg-white text-black"
		>
			<div className="md:sml-14 h-18 container mx-auto  flex items-center">
				<Link href="/main">
					<Image
						src="/assets/newlogo.png"
						width={300}
						height={100 / 3.78}
						alt="ABC Foundation Logo"
					/>
				</Link>

				<div className="mx-auto hidden items-center gap-10 text-2xl lg:flex">
					{links.map((link, idx) =>
						link.name == 'Resources' ? (
							<Custom key={8} />
						) : (
							<Link
								key={idx}
								href={link.href}
								className={clsx({
									'text-abcf bg-sky-100': pathname === link.href,
								})}
							>
								<h6 className="hidden md:block">{link.name}</h6>
							</Link>
						),
					)}
				</div>
				{/* <div className="mr-4 mt-4"><SearchLayer /></div> */}
				<div className="hidden lg:flex">
					<Link
						href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
						target="_blank"
						rel="noreferrer"
					>
						<Button className="bg-abcf text-black" size="lg">
							Donate
						</Button>
					</Link>
				</div>

				<IconButton
					variant="text"
					color="white"
					onClick={handleOpen}
					className="ml-auto inline-block lg:hidden"
				>
					{open ? (
						<XMarkIcon strokeWidth={2} className="mr-6 h-6 w-6 text-black" />
					) : (
						<Bars3Icon strokeWidth={2} className="mr-8 h-6 w-6 text-black" />
					)}
				</IconButton>
			</div>

			<Collapse open={open}>
				<div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
					<ul className="flex flex-col gap-4 text-lg text-gray-900">
						<li className="hover:text-abcf">
							<Link href="/main">
								<h6>Home</h6>
							</Link>
						</li>
						<li className="hover:text-abcf">
							<Link href="/main/about">
								<h6>About Us</h6>
							</Link>
						</li>
						<Custom />
						<li className="hover:text-abcf">
							<Link href="/main/contacts">
								<h6>Contact Us</h6>
							</Link>
						</li>
					</ul>
					{/* <SearchLayer /> */}
					<Link href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144">
						<Button className="bg-abcf mt-5 text-black" size="lg">
							Donate
						</Button>
					</Link>
					<div className="mt-6 flex gap-4 ">
						<a
							href="https://www.facebook.com/ABCFoundationConnect/"
							title="social"
							target="_blank"
							rel="noopener"
							className="hover:text-abcf"
						>
							<FaSquareFacebook size={30} />
						</a>
						<a
							href="https://www.linkedin.com/company/advocacy-for-better-communities-foundation-abc-foundation/"
							title="social"
							target="_blank"
							rel="noopener"
							className="hover:text-abcf"
						>
							<FaLinkedin size={30} />
						</a>
						<a
							href="https://www.instagram.com/the.abcfoundation/"
							title="social"
							target="_blank"
							rel="noopener"
							className="hover:text-abcf"
						>
							<FaInstagramSquare size={30} />
						</a>
					</div>
				</div>
			</Collapse>
		</Navbar>
	);
};

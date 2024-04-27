import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import HamburgerSVG from './icons/svgs/HamburgerSVG';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

const links = [
	{ name: 'Home', href: 'https://www.abcfoundationconnect.com/main' },
	{
		name: 'About Us',
		href: 'https://www.abcfoundationconnect.com/main/about',
		submenu: true,
		submenuItems: [{ name: 'Founder', href: 'https://www.abcfoundationconnect.com/main/founder' }],
	},
	{
		name: 'Resources',
		href: 'https://www.abcfoundationconnect.com/main/resources',
		submenu: true,
		submenuItems: [
			{ name: 'Articles', href: 'https://blog.abcfoundationconnect.com/' },
			{ name: 'Education', href: 'https://www.abcfoundationconnect.com/main/resources/education' },
		],
	},
	{
		name: 'Initiatives',
		href: 'https://www.abcfoundationconnect.com/main/initiatives',
		submenu: true,
		submenuItems: [
			{
				name: 'Legal Communities Connects',
				href: 'https://www.abcfoundationconnect.com/main/initiatives/legal-connect',
			},
			{
				name: 'Changemakers',
				href: 'https://www.abcfoundationconnect.com/main/initiatives/changemakers',
			},
		],
	},
	{ name: 'Contact Us', href: 'https://www.abcfoundationconnect.com/main/contacts' },
];

export const Header = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const [slideDown, setSlideDown] = useState<boolean>(false);
	const [slideDownX, setSlideDownX] = useState<boolean>(false);

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const handleSubmenuItemClicked = (url: string) => {
		window.location.href = url;
	};

	return (
		<header className="border-b bg-white py-5 dark:border-neutral-800 dark:bg-neutral-900">
			<div>
				{/* Upper section */}
				<div className=" flex justify-between pb-4 align-middle md:pb-0 ">
					<div className="pl-5 md:pl-10">
						<Link href="https://www.abcfoundationconnect.com/">
							<Image
								src="/images/newlogo.png"
								width={300}
								height={100 / 3.78} // Calculated height based on the aspect ratio
								alt="ABC Foundation Logo"
								className="w-52 md:w-fit "
							/>
						</Link>
					</div>
					<div className="  hidden text-xl lg:flex">
						<div className="mr-32 mt-6 flex space-x-8">
							{links.map((listData, idx) => (
								<div key={idx}>
									{listData.submenu ? (
										<DropdownMenu.Root>
											<DropdownMenu.Trigger asChild>
												<div className="group relative">
													<h3>{listData.name}</h3>
													<div
														className="absolute z-[999] hidden w-[200px] flex-col space-y-3 rounded-lg 
                                border bg-white p-3 shadow-lg group-hover:flex"
													>
														{listData.submenuItems.map((data, idx) => (
															<h6
																className="hover:text-abcf text-sm"
																key={idx}
																onClick={() => handleSubmenuItemClicked(data.href)}
															>
																{data.name}
															</h6>
														))}
													</div>
												</div>
											</DropdownMenu.Trigger>
										</DropdownMenu.Root>
									) : (
										<Link href={listData.href} key={idx}>
											<h3> {listData.name}</h3>
										</Link>
									)}
								</div>
							))}
						</div>
						<Link
							href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
							target="_blank"
							className="bg-abcf mr-10 mt-4 h-fit rounded-lg 
                    px-6 py-3
                        text-sm font-semibold uppercase text-black "
						>
							Donate
						</Link>
					</div>
					<div className="pt-4 lg:hidden">
						{isSidebarVisible ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								onClick={toggleSidebar}
								width="24"
								height="24"
								fill="currentColor"
								className="bi bi-x-lg mr-3 mt-3"
								viewBox="0 0 16 16"
							>
								<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
							</svg>
						) : (
							<Button
								type="outline"
								label=""
								icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
								className="bg-abcf rounded-xl border-transparent !px-3 !py-2 text-black "
								onClick={toggleSidebar}
							/>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

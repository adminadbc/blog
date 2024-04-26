import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
// import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';
import SearchLayer from './searchBox';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

const links = [
	{ name: "Home", href: "https://www.abcfoundationconnect.com/main" },
	{
	  name: "About Us",
	  href: "https://www.abcfoundationconnect.com/main/about",
	  submenu: true,
	  submenuItems: [{ name: "Founder", href: "https://www.abcfoundationconnect.com/main/founder" }],
	},
	{
	  name: "Resources",
	  href: "https://www.abcfoundationconnect.com/main/resources",
	  submenu: true,
	  submenuItems: [{ name: "Articles", href: "https://www.abcfoundationconnect.com/articles" }],
	},
	{ name: "Contact Us", href: "https://www.abcfoundationconnect.com/main/contacts" },
  ];

export const Header = () => {
	// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 3);
	const hiddenItems = navbarItems.slice(3);

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const navList = (
		<ul className="flex flex-row items-center gap-2 text-black">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
					>
						<h6 className="text-2xl">{item.label}</h6>
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="transition-200 block rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white">
								More
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="w-48 rounded border border-gray-300 bg-white text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
								align="end"
								sideOffset={5}
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="transition-200 block truncate p-2 text-xl transition-colors hover:bg-slate-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className="border-b bg-white py-5 px-5 md:px-10 dark:border-neutral-800 dark:bg-neutral-900">
			<div>
				{/* Upper section */}
				<div className=" flex justify-between align-middle">
				<div>
				<Link href="https://www.abcfoundationconnect.com/">
							<Image
								src="/images/newlogo.png"
								width={300}
								height={100 / 3.78} // Calculated height based on the aspect ratio
								alt="ABC Foundation Logo"
							/>
						</Link>
				</div>
				<div className='  text-2xl hidden lg:flex'>
					<div className='flex space-x-8 mt-6 mr-32'>
					{links.map((listData, idx)=>
						<Link  href={listData.href} className='' key={idx}>
					<h3>		{	listData.name}</h3>
						</Link>
					)}
					</div>
					<Link
							href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
							target='_blank'
							className='text-black uppercase px-6 py-3 text-sm 
					font-semibold rounded-lg
						bg-abcf h-fit mt-2'	>
						Donate
					</Link>
				</div>
				<div className='lg:hidden pt-4'>
				{
					isSidebarVisible ?
					<svg xmlns="http://www.w3.org/2000/svg" onClick={toggleSidebar} 
					 width="24" height="24" fill="currentColor" className="bi bi-x-lg mt-3 mr-3" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
				  </svg> : <Button
				type="outline"
				label=""
				icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
				className="bg-abcf rounded-xl border-transparent !px-3 !py-2 text-black "
				onClick={toggleSidebar}
			/>
				}
				</div>
				</div>
				{ isSidebarVisible &&
				 <div className={`lg:hidden flex flex-col pl-4 space-y-6 text-lg py-10 
				transition-transform duration-500 transform ${isSidebarVisible ? 'translate-y-[-10]' : 'translate-y-0'}`}>
				{links.map((listData, idx)=>
						<Link href={listData.href} key={idx}>
				<h3>		{	listData.name}</h3>
						</Link>
					)}
					<Link
							href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
							target='_blank'
							className='text-black uppercase px-6 py-3 text-sm 
					font-semibold rounded-lg
						bg-abcf h-fit w-fit'	>
						Donate
					</Link>
				</div>
				}
				
			</div>
			{/* <Container className="grid grid-cols-4 gap-5 px-5">
				<div className="col-span-2 flex flex-1 flex-row items-center gap-2 lg:col-span-1">
					<div className="lg:hidden">
						<Button
							type="outline"
							label=""
							icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
							className="bg-abcf rounded-xl border-transparent !px-3 !py-2 text-black "
							onClick={toggleSidebar}
						/>

						{isSidebarVisible && (
							<PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
						)}
					</div>
					<div className="hidden lg:block">
						<Link href="https://www.abcfoundationconnect.com/">
							<Image
								src="/images/newlogo.png"
								width={300}
								height={100 / 3.78} // Calculated height based on the aspect ratio
								alt="ABC Foundation Logo"
							/>
						</Link>
					</div>
				</div>
				<div className="col-span-2 flex flex-row items-center justify-end gap-5 text-black lg:col-span-3">
					<nav className="hidden text-black lg:block">{navList}</nav>
					<SearchLayer />
					<Button
						href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
						as="a"
						label="DONATE"
						className="bg-abcf text-black"
					/>
				</div>
			</Container>
			<div className="mt-5 flex justify-center lg:hidden">
				{' '}
				<Link href="https://www.abcfoundationconnect.com/">
					<Image
						src="/images/newlogo.png"
						width={300}
						height={100 / 3.78} // Calculated height based on the aspect ratio
						alt="ABC Foundation Logo"
					/>
				</Link>
			</div> */}
		</header>
	);
};

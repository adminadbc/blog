import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState, } from 'react';
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
	  submenuItems: [{ name: "Articles", href: "https://www.abcfoundationconnect.com/articles" },
	   { name: "Education", href: "https://www.abcfoundationconnect.com/main/resources/education" }],
	},	{
		name: "Initiatives",
		href: "https://www.abcfoundationconnect.com/main/resources",
		submenu: true,
		submenuItems: [{ name: "Legal Communities Connects", href: "https://www.abcfoundationconnect.com/main/initiatives/legal-connect" },{
			name : "Changemakers", href : "https://www.abcfoundationconnect.com/main/initiatives/changemakers"
		}],
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
	const [slideDown, setSlideDown] =useState<boolean>(false)
	const [slideDownX, setSlideDownX] =useState<boolean>(false)
	const [slideDownT, setSlideDownT] =useState<boolean>(false)

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
		<header className="border-b bg-white py-5 dark:border-neutral-800 dark:bg-neutral-900">
			<div>
				{/* Upper section */}
				<div className=" flex justify-between align-middle pb-4 md:pb-0 ">
				<div className='pl-5 md:pl-10'>
				<Link href="https://www.abcfoundationconnect.com/">
							<Image
								src="/images/newlogo.png"
								width={300}
								height={100 / 3.78} // Calculated height based on the aspect ratio
								alt="ABC Foundation Logo"
								className='w-52 md:w-fit '
							/>
						</Link>
				</div>
				<div className='  text-xl hidden lg:flex'>
					<div className='flex space-x-8 mt-6 mr-32'>
					{links.map((listData, idx)=>
						<Link  href={listData.href} className='' key={idx}>
							{listData.submenu ? <div className='group relative'>
								<h3>{listData.name}</h3>
								<div className='hidden bg-white absolute group-hover:flex flex-col space-y-3 z-[999] 
								w-[200px] rounded-lg shadow-lg p-3 border'>
									
								{listData.submenuItems.map((data, idx)=>
								<h6 className='text-sm hover:text-abcf'>{data.name}</h6>)}
								</div>
							</div> :
							<h3>		{	listData.name}</h3> }
					
						</Link>
					)}
					</div>
					<Link
							href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
							target='_blank'
							className='text-black uppercase px-6 py-3 text-sm 
					font-semibold rounded-lg
						bg-abcf h-fit mt-4 mr-10 '	>
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
				{/* { isSidebarVisible && */}
				<div className={`lg:hidden overflow-hidden ${isSidebarVisible ? 'h-fit' : 'h-0'}`}>
				 <div className={`text-lg py-10 
				transition ${isSidebarVisible ? 'translate-y-0' : '-translate-y-96'}`}>
			<ul className='flex flex-col pl-8 space-y-4 mb-4'>
				<li><Link href="https://www.abcfoundationconnect.com/main"><h3>Home</h3></Link></li>
				<li className='relative' onClick={()=>setSlideDownT(!slideDownT)}><Link href=""><h3>About Us</h3></Link>{
					slideDownT &&
				<div className='shadow-lg bg-white flex flex-col space-y-3 text-sm w-fit p-4  rounded-lg '>
					<Link href="https://www.abcfoundationconnect.com/main/founder"><h6>Founder</h6></Link>
				</div>}
				</li>
				<li className='relative' onClick={()=>setSlideDown(!slideDown)}><Link href=""><h3>Resources</h3></Link>{
					slideDown &&
				<div className='shadow-lg bg-white flex flex-col space-y-3 text-sm w-fit p-4  rounded-lg '>
					<Link href="https://www.abcfoundationconnect.com/main/resources/education"><h6>Education</h6></Link>
					<Link href="https://www.abcfoundationconnect.com/articles"><h6>Articles</h6></Link></div>}
				</li>
				<li className='relative' onClick={()=>setSlideDownX(!slideDownX)}><Link href=""><h3>Initiatives</h3></Link>{
					slideDownX &&
				<div className='shadow-lg bg-white flex flex-col space-y-3 text-sm w-fit p-4  rounded-lg '>
					<Link href="https://www.abcfoundationconnect.com/main/initiatives/legal-connect"><h6> Legal Communities Connects</h6></Link>
					<Link href="https://www.abcfoundationconnect.com/main/initiatives/changemakers"><h6>Changemakers</h6>
					</Link></div>}
				</li>
				<li><Link href="https://www.abcfoundationconnect.com/main/contact"><h3>Contact Us</h3></Link></li>
			</ul>
					<Link
							href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
							target='_blank'
							className='text-black uppercase px-6 py-3 text-sm 
					font-semibold rounded-lg
						bg-abcf h-fit w-fit ml-6'	>
						Donate
					</Link>
					<div className='flex space-x-3 ml-6 mt-8'>
						<Link href="https://www.linkedin.com/company/advocacy-for-better-communities-foundation-abc-foundation/" target='_blank'>
						<svg xmlns="http://www.w3.org/2000/svg" 
						width="24" height="24" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
						</Link>
						<Link href="https://www.instagram.com/the.abcfoundation" target='_blank'>
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" 
						width="30" height="30" viewBox="0 0 30 30"> <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path> 
						</svg>
						</Link>
						<Link href="https://www.facebook.com/ABCFoundationConnect" target='_blank'>
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
</svg>
						</Link>
						</div>
				</div></div>
				{/* } */}
				
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

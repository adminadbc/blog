import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './button';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import SearchLayer from './searchBox';

const links = [
	{ name: "Home", href: "/" },
	{
		name: "About Us",
		href: "/about",
		submenu: true,
		submenuItems: [
			{ name: "Team", href: "/about/team" },
			{ name: "Articles", href: "https://blog.abcfoundationconnect.com/" },
		],
	},
	{
		name: "Advocacy",
		href: "/advocacy",
		submenu: true,
		submenuItems: [
			{ name: "LAS", href: "/advocacy/legal-advocacy-and-support" },
			{ name: "Engage", href: "/advocacy/engage" },
			{ name: "Safe Spaces", href: "/advocacy/safe-spaces" },
			{ name: "United Journeys", href: "/advocacy/united-journeys" },
		],
	},
	{
		name: "Education",
		href: "/education",
		submenu: true,
		submenuItems: [
			{
				name: "LAP",
				href: "/education/legal-awareness-program",
			},
			{ name: "Changemakers", href: "/education/changemakers" },
		],
	},
	{ name: "Contact Us", href: "/contacts" },
];

interface DropMenuProps {
	title: string;
	items: { name: string; href: string }[];
}

const DropMenu: React.FC<DropMenuProps & { isOpen: boolean; toggleDropdown: () => void }> = ({
	title,
	items,
	isOpen,
	toggleDropdown,
}) => {
	return (
		<div 
			className="relative"
			onMouseEnter={toggleDropdown}
			onMouseLeave={toggleDropdown}
		>
			<div
				className="inline-flex w-full justify-start bg-white py-2 font-normal cursor-pointer"
				aria-haspopup="true"
			>
				<h3>{title}</h3>
			</div>
			<div
				className={`absolute left-0 top-full mt-2 w-48 origin-top transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out z-50 ${
					isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
				}`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				<div className="py-1" role="none">
					{items.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className="hover:text-abcf block px-4 py-2 text-base text-gray-700"
							role="menuitem"
						>
							<h6>{item.name}</h6>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export const Header = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const [openDropdown, setOpenDropdown] = useState<number | null>(null);
	const [slideDownX, setSlideDownX] = useState<boolean>(false);
	const [slideDown, setSlideDown] = useState<boolean>(false);

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const toggleDropdown = (dropdownId: number) => {
		setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
	};

	return (
		<header className="mx-auto border-b bg-white py-5 dark:border-neutral-800 dark:bg-neutral-900">
			<div>
				{/* Upper section */}
				<div className="mx-auto flex items-center justify-around pb-4 align-middle sm:w-11/12 md:justify-between md:pb-0 lg:w-10/12 ">
					<div className="pl-5 md:pl-10">
						<Link href="https://www.abcfoundationconnect.com/">
							<Image
								src="/images/newlogo.png"
								width={300}
								height={100 / 3.78}
								alt="ABC Foundation Logo"
								className="w-52"
							/>
						</Link>
					</div>
					<div className="hidden text-xl xl:flex">
						<div className="flex items-center space-x-6">
							{links.map((listData, idx) => (
								<div key={idx} className="flex items-center">
									{listData.submenu ? (
										<DropMenu
											title={listData.name}
											items={listData.submenuItems}
											isOpen={openDropdown === idx}
											toggleDropdown={() => toggleDropdown(idx)}
										/>
									) : (
										<Link href={listData.href}>
											<h3>{listData.name}</h3>
										</Link>
									)}
								</div>
							))}
						</div>
					</div>
					<SearchLayer />
					<div className="hidden text-xl xl:flex">
						<Link
							href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
							target="_blank"
							className="bg-abcf mr-10 h-fit rounded-lg 
                    px-6 py-3
                        text-sm font-semibold uppercase text-black "
						>
							Donate
						</Link>
					</div>
					<div className="xl:hidden">
						{isSidebarVisible ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								onClick={toggleSidebar}
								width="24"
								height="24"
								fill="currentColor"
								className="bi bi-x-lg mr-3 mt-3 md:mr-10"
								viewBox="0 0 16 16"
							>
								<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
							</svg>
						) : (
							<Button
								type="outline"
								label=""
								icon={<HamburgerSVG className="h-5 w-5 stroke-current md:h-8 md:w-8" />}
								className="bg-abcf rounded-xl border-transparent !px-3 !py-2 text-black "
								onClick={toggleSidebar}
							/>
						)}
					</div>
				</div>
			</div>
			{/* Mobile version */}
			<div className={`overflow-hidden xl:hidden ${isSidebarVisible ? 'h-fit' : 'h-0'}`}>
				<div
					className={`py-10 text-lg transition ${
						isSidebarVisible ? 'translate-y-0' : '-translate-y-96'
					}`}
				>
					<ul className="mb-4 flex flex-col space-y-4 pl-8 md:pl-40">
						{links.map((listData, idx) => (
							<li key={idx}>
								{listData.submenu ? (
									<>
										<div onClick={() => listData.name === 'About Us' ? setSlideDownX(!slideDownX) : setSlideDown(!slideDown)}>
											<h6>{listData.name}</h6>
										</div>
										{((listData.name === 'About Us' && slideDownX) || ((listData.name === 'Advocacy' || listData.name === 'Education') && slideDown)) && (
											<div className="flex w-fit flex-col space-y-4 rounded-lg bg-white p-3 text-sm shadow-lg">
												{listData.submenuItems.map((item, index) => (
													<Link key={index} href={item.href}>
														<h6>{item.name}</h6>
													</Link>
												))}
											</div>
										)}
									</>
								) : (
									<Link href={listData.href}>
										<h6>{listData.name}</h6>
									</Link>
								)}
							</li>
						))}
					</ul>
					<Link
						href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
						target="_blank"
						className="bg-abcf ml-6 h-fit w-fit rounded-lg px-6 py-3 text-sm font-semibold uppercase text-black md:ml-40"
					>
						Donate
					</Link>
					<div className="ml-6 mt-8 flex space-x-3 md:ml-40">
						<Link
							href="https://www.linkedin.com/company/advocacy-for-better-communities-foundation-abc-foundation/"
							target="_blank"
							className="mt-1"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								className="bi bi-linkedin"
								viewBox="0 0 16 16"
							>
								<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
							</svg>
						</Link>
						<Link href="https://www.instagram.com/the.abcfoundation" className="" target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="32"
								height="32"
								viewBox="0 0 30 30"
							>
								{' '}
								<path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
							</svg>
						</Link>
						<Link href="https://www.facebook.com/ABCFoundationConnect" target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="32"
								height="32"
								viewBox="0 0 30 30"
							>
								<path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

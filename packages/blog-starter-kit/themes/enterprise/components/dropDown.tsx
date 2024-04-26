'use client';

import React, { useState } from 'react';

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
			className="flex flex-col text-left "
			onMouseEnter={toggleDropdown}
			onMouseLeave={toggleDropdown}
		>
			<div
				className="inline-flex w-full justify-start   bg-white py-2  font-normal"
				aria-haspopup="true"
				{...(isOpen && { 'aria-expanded': 'true' })}
			>
				<h6> {title}</h6>
			</div>
			<div
				className={`absolute  mt-10 w-fit  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 md:mt-10 ${
					isOpen ? '' : 'hidden'
				}`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				<div className="py-1" role="none">
					{items.map((item, index) => (
						<a
							key={index}
							href={item.href}
							className="hover:text-abcf block px-4 py-2 text-base text-gray-700"
							role="menuitem"
						>
							<h6>{item.name}</h6>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

const Custom: React.FC = () => {
	console.log('Custom component rendering');

	const [openDropdown, setOpenDropdown] = useState<number | null>(null);
	const toggleDropdown = (dropdownId: number) => {
		setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
	};

	return (
		<div className="sm:justify-left sm:items-left  z-[99] gap-4 sm:flex">
			<DropMenu
				title="Resources"
				items={store[0].submenuItems}
				isOpen={openDropdown === 1}
				toggleDropdown={() => toggleDropdown(1)}
			/>
			<DropMenu
				title="Initiatives"
				items={store[1].submenuItems}
				isOpen={openDropdown === 2}
				toggleDropdown={() => toggleDropdown(2)}
			/>
		</div>
	);
};

export default Custom;

const store = [
	{
		name: 'Resources',
		href: '/main/resources',
		submenu: true,
		submenuItems: [
			{ name: 'Education', href: '/main/resources/education' },
			{ name: 'Articles', href: 'https://abc-kit.vercel.app/' },
		],
	},
	{
		name: 'Initiatives',
		href: '/main/initiatives',
		submenu: true,
		submenuItems: [
			{
				name: 'Legal Community Connect',
				href: '/main/initiatives/legal-connect',
			},
			{ name: 'Changemakers', href: '/main/initiatives/changemakers' },
		],
	},
];

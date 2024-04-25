'use client';
import Image from 'next/image';
import { FaSquareFacebook } from 'react-icons/fa6';

const links = [
	{
		title: 'Pages',
		items: [
			{ name: 'Home', url: '/' },
			{ name: 'About Us', url: '/main/about' },
			{ name: 'Contact Us', url: '/main/contacts' },
		],
	},
	{
		title: 'Legal',
		items: [
			{ name: 'Terms', url: '/main/terms' },
			{ name: 'Privacy', url: '/main/policy' },
		],
	},

	{
		title: 'Product',
		items: [
			{ name: 'Changemakers', url: '/main/initiatives/changemakers' },
			{
				name: 'Legal Community Connect',
				url: '/main/initiatives/legal-connect',
			},
		],
	},
];

const currentYear = new Date().getFullYear();

export const Footer = () => {
	// const { publication } = useAppContext();
	// const PUBLICATION_LOGO = publication.preferences.logo;
	return (
		<footer className="bg-brand2 px-8 py-28">
			<div className="container mx-auto">
				<div className="flex justify-between gap-4 md:grid-cols-2 lg:px-2">
					<div className="mb-8 md:mb-0">
						<Image
							src="/images/newlogowhite.png"
							width={250}
							height={80}
							alt="ABC Foundation Logo"
						/>

						<div className="mt-6 flex gap-4 text-white ">
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
								{/* <FaLinkedin size={30} /> */}
							</a>
							<a
								href="https://www.instagram.com/the.abcfoundation/"
								title="social"
								target="_blank"
								rel="noopener"
								className="hover:text-abcf"
							>
								{/* <FaInstagramSquare size={30} /> */}
							</a>
						</div>
					</div>
					<div className="grid grid-cols-2 justify-between gap-6 text-white lg:grid-cols-3">
						{links.map(({ title, items }) => (
							<ul key={title}>
								<h6 className="mb-2 mr-2 text-2xl font-bold">{title}</h6>
								{items.map((link) => (
									<li key={link.name}>
										<a
											href={link.url}
											className="hover:text-abcf py-1 font-medium text-white transition-colors"
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
				<hr className="w-12/12 bg-abcf mx-auto my-10 h-px border-0 text-white" />
				{/* <Container className="px-5"> */}
				{/* {PUBLICATION_LOGO ? (
					<div className="mb-20 flex w-full flex-row justify-start">
						<Link
							href={'/'}
							aria-label={`${publication.title} home page`}
							className="flex flex-row items-center gap-5"
						>
							<Image
								className="block w-40"
								src={PUBLICATION_LOGO}
								alt={publication.title}
								width={300}
								height={150}
							/>
						</Link>
					</div>
				) : (
					<p className="mb-20 text-center text-xl font-semibold text-slate-900 dark:text-slate-50 md:text-4xl">
						{publication.title}
					</p>
				)} */}

				{/* <SocialLinks /> */}
				{/* </Container> */}
			</div>
		</footer>
	);
};

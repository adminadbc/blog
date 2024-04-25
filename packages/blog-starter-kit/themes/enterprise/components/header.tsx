import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Container } from './container';
import request, {gql} from 'graphql-request';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import { PublicationLogo } from './publication-logo';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import algoliasearch from 'algoliasearch';
import { FaInstagramSquare } from "react-icons/fa";
import { useEffect } from 'react';
import PublicationSidebar from './sidebar';
import clsx from "clsx";
import { Navbar, Collapse, IconButton, Button } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Custom from './dropDown';
import SearchLayer from './searchBox';


function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}
interface dataLog{
	title : string,
	objectID : string,
	image : string,
	brief : string,
	link : string
  }
  const links = [
	{ name: "Home", href: "https://www.abcfoundationconnect.com//main" },
	{
	  name: "About Us",
	  href: "/main/about",
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

  let replacement : dataLog[] = []


export const Header = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	
	const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
	const userId = process.env.NEXT_PUBLIC_USER_ID;
	// Connect and authenticate with your Algolia app
	const client = algoliasearch(API_KEY!, userId!);
  
	

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
  
	const pathname = usePathname();

	  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 1060 && setOpen(false)
    );
    const fetchPublication = async () => {
      const endpoint = 'https://gql.hashnode.com';

      const query = gql`
        query Publication($host: String!) {
          publication(host: $host) {
            title
            id
            posts(first: 10) {
              edges {
                node {
                  title
                  id
                  url
                  brief
                  coverImage {
                    attribution
                    photographer
                  }
                  content {
                    text
                  }
                }
              }
            }
          }
        }
      `;

      const variables = {
        host: "abcfoundationconnect.hashnode.dev" 
      };

      try {
        const data = await request(endpoint, query, variables);
        const { publication : {
          posts :{
            edges
          }
        } } : any = data
        replacement = edges.map((item:any)  => ({
          title: item.node.title,
          objectID: item.node.id,
          image : item.node.coverImage || "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          brief : item.node.brief.replace(/<[^>]+>/g, ''),
          link : `/main/resources/articles/${item.node.id}`
        }))
       
        const index = client.initIndex('test');
        console.log("start..")
        index.replaceAllObjects(replacement).then(({ objectIDs }) => {
          console.log("succccceeeesss")
          console.log(objectIDs);
        });
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPublication();
  }, []);
	return (
		<header className="border-b text-black flex gap-4 ">
			
			    <div className="mx-auto md:ml-auto flex gap-4 border-4 border-red-400  items-center h-18">
        <Link href="/main">
          <Image
            src=""
            width={300} // Desired width
            height={100 / 3.78} // Calculated height based on the aspect ratio
            alt="ABC Foundation Logo"
			className='h-20 w-56'
          />
        </Link>

        <div className="hidden items-center gap-10 lg:flex text-2xl w-full ">
          {links.map((link, idx) =>
            link.name == "Resources" ? (
              <Custom key={8} /> 
            ) : (
              <Link
                key={idx}
                href={link.href}
                // className={clsx({
                //   "bg-sky-100 text-abcf w-fit border-4 border-black hidden ": pathname === link.href,
                // })}
              >
             About Us
              </Link>
            )
          )}
          <SearchLayer />
        </div>

        <div className="hidden lg:flex">
          <Link
            href="https://donate.abcfoundationconnect.com/b/8wMaEK1aw8OGdj2144"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bg-abcf text-black  px-8 py-2 rounded-md" size="lg" >
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
            <XMarkIcon strokeWidth={2} className="h-6 w-6 text-black mr-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6 text-black mr-8" />
          )}
        </IconButton>
      </div>

      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-900 text-lg">
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
            {/* <Custom /> */}
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
          <div className="flex gap-4 mt-6 ">
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
		</header>
	);
};

import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Navbar = () => {
  const { publication } = useAppContext();
  
  return (
    <div className="grid grid-cols-1 items-center gap-5 pt-5 text-sm md:grid-cols-2">
      <SocialLinks />
    </div>
  );
};

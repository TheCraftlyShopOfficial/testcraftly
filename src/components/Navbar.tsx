import { Search } from "lucide-react";
import SearchBarForNav from "./client-components/SearchBarForNav";
import Link from "next/link";
import Navigation from "./client-components/Navbar";
const Navbar = async () => {
  return (
    <>
      <header className="backdrop-blur-lg border-b bg-white/75 sticky top-0 inset-x-0 z-10">
        <div className="bg-black py-1">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <p className="text-xs tracking-tight text-white/75 text-center">
                Exclusive Deals: Up to 50% Off Select Gifts – Shop Now!
              </p>
            </div>
          </div>
        </div>
        <div className="py-1">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center justify-center">
                <video className="w-10 h-10" autoPlay muted loop>
                  <source src="/gift.webm"></source>
                </video>
                {/* <Image className="w-8 h-8" src={Gift} alt="logo" /> */}
                <span className="font-semibold text-xs tracking-tighter">
                  THE CRAFTLY SHOP
                </span>
              </Link>
              <div className="hidden md:block">
                <SearchBarForNav />
              </div>

              <div className="flex items-center gap-1">
                <Link href="/" className="md:hidden">
                  <Search className="w-5 h-5" />
                </Link>
                <Navigation />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

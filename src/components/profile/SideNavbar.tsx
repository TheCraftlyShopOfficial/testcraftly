import Link from "next/link";
import SideNavbarHeader from "../client-components/SideNavbarHeader";

export default function SideNavbar() {
  return (
    <>
      <aside className="w-64 p-4 border-r">
        <SideNavbarHeader />
        <div className="mt-10">
          <Link
            className="block my-2 py-3 px-4 rounded-full hover:bg-zinc-800 hover:text-white"
            href="/profile"
          >
            My Orders
          </Link>
          <Link
            className="block my-2 py-3 px-4 rounded-full hover:bg-zinc-800 hover:text-white"
            href="/profile/personal-information"
          >
            Personal Information
          </Link>
        </div>
      </aside>
    </>
  );
}

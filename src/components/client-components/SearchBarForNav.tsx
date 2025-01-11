"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { client } from "@/lib/client";
import { searchAProducutQuery } from "@/query/querys";

interface ProductSearchResult {
  _id: string;
  name: string;
}

const SearchBarForNav = () => {
  const [searchText, setSearchText] = useState("");
  const [searchRes, setSearchRes] = useState<ProductSearchResult[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.trim().length > 0) {
        getItems(searchText);
      } else {
        setSearchRes(null);
      }
    }, 300); // Delay in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const getItems = async (query: string) => {
    try {
      setIsLoading(true);
      const data = await client.fetch(searchAProducutQuery(query));
      console.log(data);
      setSearchRes(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchText("");
    setSearchRes(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchText("");
        setSearchRes(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim().length > 0) {
      router.push(`/search/${searchText}`);
    }
  };

  const memoizedSearchResults = useMemo(() => {
    if (isLoading) {
      return (
        <p className="text-sm rounded-md cursor-pointer py-1 px-2">
          Loading...
        </p>
      );
    }
    if (searchRes && searchRes.length > 0) {
      return searchRes.map((item) => (
        <Link
          href={`/product/${item.name}/${item._id}`}
          key={item._id}
          className="text-sm flex items-center gap-2 hover:bg-zinc-200 rounded-md cursor-pointer py-1 px-2"
        >
          <Search className="w-3 h-3" />
          {item.name}
        </Link>
      ));
    }
    if (searchText.trim().length > 0) {
      return (
        <p className="text-sm rounded-md cursor-pointer py-1 px-2">
          No search results
        </p>
      );
    }
    return null;
  }, [searchRes, isLoading, searchText]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[450px] relative lg:w-[450px] flex px-4 items-center border border-zinc-400 rounded-full gap-2"
      ref={searchRef}
    >
      <Search className="w-4 text-zinc-500" />
      <input
        type="text"
        id="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="text-sm py-2 flex-1 outline-none border-none bg-inherit placeholder:text-zinc-500 tracking-tight"
        placeholder="Search products..."
        autoComplete="off"
      />
      {searchText.length > 0 && (
        <div className="absolute bg-white flex flex-col gap-1 top-12 py-3 px-2 rounded-md shadow-lg inset-x-0 z-50">
          {memoizedSearchResults}
        </div>
      )}
    </form>
  );
};

export default SearchBarForNav;

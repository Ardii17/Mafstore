import Button from "@/components/elements/button";
import { Dispatch, FormEvent, SetStateAction } from "react";

export default function SearchComponent(props: {
  onSearch: boolean;
  setOnSearch: Dispatch<SetStateAction<boolean>>;
  inputSearch: any;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div
      className={`${
        props.onSearch ? "lg:-left-52 md:-left-16" : "left-0"
      } relative transition-all gap-2 max-sm:justify-center flex items-center`}
    >
      {props.onSearch && (
        <i
          className="bx bx-left-arrow-alt text-2xl p-1 max-sm:block md:hidden lg:hidden"
          onClick={() => props.setOnSearch(false)}
        />
      )}
      <form
        className="flex max-sm:gap-2 md:gap-4"
        onSubmit={props.handleSearch}
      >
        <div>
          <i
            className={`${
              props.onSearch ? "block" : "md:hidden max-sm:hidden"
            } bx bx-search absolute left-4 max-sm:left-12 lg:block top-1/2 -translate-y-1/2 text-xl text-black`}
          />
          <input
            type="text"
            name="search"
            onFocus={() => props.setOnSearch(true)}
            placeholder="Search products"
            autoComplete="off"
            ref={props.inputSearch}
            className={`${
              props.onSearch
                ? "block sm:w-64 max-sm:w-64"
                : "max-md:hidden sm:hidden"
            } bg-gray-200 transition-all lg:block rounded-full w-56 md:focus:w-96 py-2 max-sm:ps-8 md:ps-12 pe-4 text-black`}
          />
        </div>
        <Button
          type="submit"
          className={`${
            props.onSearch ? "block" : "hidden"
          } px-4 border-2 text-sm border-blue-900 bg-blue-900 rounded-full py-2`}
        >
          Cari
        </Button>
      </form>
    </div>
  );
}

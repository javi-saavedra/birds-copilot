import { ChangeEvent, memo } from "react";
import { twMerge } from "tailwind-merge";
import { Search } from "lucide-react";

type SearchBarProps = {
    value: string;
    placeholder?: string;
    className?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = memo(({ value, onChange, placeholder, className }: SearchBarProps) => {
    return (
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blueberry" size={22} />
            <input
                type="text"
                placeholder={placeholder ?? 'Search'}
                value={value}
                onChange={onChange}
                className={twMerge(
                    'w-full bg-secondary/8 rounded-md pl-14 pr-4 py-3 placeholder:text-blueberry/85 font-light focus:outline-none',
                    className
                )}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
});

export default SearchBar;
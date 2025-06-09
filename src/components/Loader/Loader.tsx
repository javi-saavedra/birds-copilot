import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

type LoaderProps = {
    className?: string;
}

const Loader = ({ className }: LoaderProps) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <LoaderCircle className={twMerge("w-6 h-6 animate-spin", className)} />
        </div>
    );
};

export default Loader;
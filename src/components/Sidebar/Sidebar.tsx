import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="bg-sidebar border-r border-border-color w-[307px] h-full p-4 sticky top-0">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-0.5">
                    <h1 className="text-base font-medium text-black">The Birds App</h1>
                    <p className="text-sm text-blueberry">By Copilot</p>
                </div>

                <nav className="flex flex-col gap-1">
                    <NavLink to="/" className="block px-3 py-1.5 bg-secondary/8 rounded-md">
                        <span className="text-sm font-medium text-black">Home</span>
                    </NavLink>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
import { Bird } from "@/lib/schemas";

type BirdTranslationsProps = {
    bird: Bird;
}

const BirdTranslations = ({ bird }: BirdTranslationsProps) => {
    return (
        <div className="flex flex-col divide-y-2 divide-border-color/50">
            <h1 className="text-2xl font-bold pb-8">In Other Languages</h1>
            <div className="flex flex-col gap-y-2 py-6">
                <div className="grid grid-cols-2 gap-x-2">
                    <div className="flex flex-col gap-y-2 text-base">
                        <h2 className="text-blueberry font-light tracking-wide">English</h2>
                        <p className="">{bird.english_name}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-blueberry font-light tracking-wide">Latin</h2>
                        <p className="">{bird.latin_name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BirdTranslations;
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Bird, GET_BIRD, GetBirdResponse } from "@/lib/schemas";
import Loader from "@/components/Loader";
import { useMemo, useState } from "react";
import BirdNotes from "./BirdNotes";
import BirdTranslations from "./BirdTranslations";
import BirdModal from "./BirdModal";
import WatermarkedImage from "@/components/WatermarkedImage/WatermarkedImage";

const BirdDetails = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, loading, error } = useQuery<GetBirdResponse>(GET_BIRD, {
        variables: { id },
    });
    const bird: Bird | null = useMemo(() => data?.bird ?? null, [data]);

    if (loading) return <Loader className="w-16 h-16" />;
    if (error) return <div>Error: {error.message}</div>;
    if (bird === null) return <div className="text-blueberry italic">Bird not found</div>;

    return (
        <section className="flex flex-col divide-y-2 divide-border-color/70 max-h-screen">
            <div className="flex items-center justify-between py-4 px-6">
                <h1 className="text-3xl font-bold"><span className="text-gray-400">Birds /</span> {bird?.english_name}</h1>
                <button
                    className="py-2 px-3 text-sm rounded-lg border border-border-color/50 shadow-sm font-semibold hover:bg-gray-50 cursor-pointer"
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Note
                </button>
            </div>
            {isModalOpen && (
                <BirdModal bird={bird} onClose={() => setIsModalOpen(false)} />
            )}
            <section className="py-6 px-6 flex flex-col max-h-screen gap-y-8 overflow-y-auto" key={bird.id}>
                <WatermarkedImage src={bird.image_url} alt={bird.english_name} className="w-[301.33px] h-[169.5px] object-cover rounded-lg" />
                <BirdNotes bird={bird} />
                <BirdTranslations bird={bird} />
            </section>
        </section>
    );
};

export default BirdDetails;
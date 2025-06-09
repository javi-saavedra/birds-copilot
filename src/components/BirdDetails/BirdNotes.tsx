import { Bird } from "@/lib/schemas";
import WatermarkedImage from "@/components/WatermarkedImage/WatermarkedImage";

export type BirdNotesProps = {
    bird: Bird;
}

const BirdNotes = ({ bird }: BirdNotesProps) => {
    return (
        <div className="flex flex-col gap-y-5">
            <h1 className="text-2xl font-bold">Notes</h1>
            <div className="flex flex-col gap-y-4">
                {bird.notes.length === 0 && (
                    <div className="text-gray-400">No notes yet</div>
                )}
                {bird.notes.map((note) => (
                    <div key={note.id} className="flex items-center gap-x-4">
                        <WatermarkedImage src={bird.image_url} alt={bird.english_name} className="w-[56px] h-[56px] rounded-md object-cover" />
                        <div className="flex flex-col gap-y-0.5">
                            <h2 className="text-base font-medium">{new Date(note.timestamp * 1000).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}</h2>
                            <p className="text-sm text-blueberry">{note.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BirdNotes;

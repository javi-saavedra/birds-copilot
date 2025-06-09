import { XIcon } from "lucide-react";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { ADD_NOTE, AddNoteResponse, AddNoteVariables, Bird, GET_BIRD } from "@/lib/schemas";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

type BirdModalProps = {
    bird: Bird;
    onClose: () => void;
}

const BirdModal = ({ bird, onClose }: BirdModalProps) => {
    const form = useForm<AddNoteVariables>({
        defaultValues: {
            birdId: bird.id,
            comment: "",
            timestamp: Math.floor(Date.now() / 1000),
        },
        mode: "onChange",
        reValidateMode: "onChange",
        criteriaMode: "all",
        shouldUseNativeValidation: false,
        shouldFocusError: true,
        resolver: zodResolver(
            z.object({
                birdId: z.string(),
                comment: z.string().min(1, "Comment cannot be empty"),
                timestamp: z.number(),
            })
        ),
    });

    const [addNote, { loading, error }] = useMutation<AddNoteResponse, AddNoteVariables>(ADD_NOTE, {
        onCompleted: () => {
            onClose();
            form.reset();
        },
        onError: (error) => {
            console.error(error);
        },
        refetchQueries: [
            {
                query: GET_BIRD,
                variables: { id: bird.id }
            }
        ]
    });

    const { register, handleSubmit } = form;

    const onSubmit = (variables: AddNoteVariables) => {
        addNote({ variables: { ...variables, timestamp: Math.floor(Date.now() / 1000) } });
    };

    return (
        <Modal>
            <div className="w-lg flex flex-col divide-y divide-border-color/50">
                <div className="flex items-center justify-between px-4 py-4">
                    <h1 className="text-md font-semibold">Add a note</h1>
                    <button type="button" className="cursor-pointer" onClick={() => onClose()}>
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>
                <form className="flex flex-col divide-y divide-border-color/50" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-y-2 px-4 py-4">
                        <label htmlFor="note" className="text-sm font-medium text-gray-500">Note</label>
                        <textarea
                            id="note"
                            placeholder="Enter your notes here"
                            className="w-full h-24 py-3 px-3 bg-secondary/8 rounded-lg resize-none text-sm focus:bg-white"
                            {...register("comment")}
                        />
                        {form.formState.errors.comment && (
                            <div className="text-red-600 text-xs">{form.formState.errors.comment.message}</div>
                        )}
                        {error && (
                            <div className="text-red-600 text-xs">{error.message}</div>
                        )}
                    </div>
                    <div className="flex gap-x-4 px-4 py-4 justify-end">
                        <button
                            type="button"
                            className="py-2 px-4 text-sm rounded-lg border border-border-color/50 shadow-sm font-medium hover:bg-gray-50 cursor-pointer"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 flex items-center gap-x-2 text-sm rounded-lg shadow-sm font-medium bg-accent text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading || !form.formState.isValid}
                        >
                            {loading && <LoaderCircle className="w-4 h-4 animate-spin" />} Add note
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default BirdModal;
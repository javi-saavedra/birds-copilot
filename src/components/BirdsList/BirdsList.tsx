import { ChangeEvent, useMemo, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import { Bird, GET_BIRDS, GetBirdsResponse } from "@/lib/schemas";
import { useQuery } from '@apollo/client';
import BirdListItem from "./BirdListItem";
import Loader from "@/components/Loader";
import { useSearchParams } from "react-router-dom";

const BirdsList = () => {
    const { data, loading, error } = useQuery<GetBirdsResponse>(GET_BIRDS);
    const birds: Bird[] = useMemo(() => data?.birds ?? [], [data]);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('q') || '';

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value;
        if (newSearch) {
            setSearchParams({ q: newSearch });
        } else {
            setSearchParams({});
        }
    }, [setSearchParams]);

    const filteredBirds = useMemo(() => {
        if (search === '') return birds;

        return birds.filter(
            (bird) => bird.english_name.toLowerCase().includes(search.toLowerCase())
                || bird.latin_name.toLowerCase().includes(search.toLowerCase())
        );
    }, [birds, search]);

    return (
        <section className="flex flex-col divide-y divide-border-color max-h-screen">
            <h1 className="py-4 px-6 text-3xl font-bold">Birds</h1>
            <div className="py-6 px-6">
                <SearchBar
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search for birds"
                    className="tracking-wide"
                />
            </div>
            <section className="py-6 px-6 flex flex-wrap gap-x-6 gap-y-8 overflow-y-auto">
                {loading && <Loader className="w-16 h-16" />}
                {error && <div>Error: {error.message}</div>}
                {!loading && !error && filteredBirds.length === 0 && (
                    <div className="text-blueberry italic">No birds found</div>
                )}
                {!loading && !error && filteredBirds.length > 0 && (
                    filteredBirds.map((bird) => (
                        <BirdListItem key={bird.id} bird={bird} />
                    ))
                )}
            </section>
        </section>
    );
};

export default BirdsList;
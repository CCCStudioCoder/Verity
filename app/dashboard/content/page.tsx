'use client'

import {TextTheoryInterpreter, Text} from "@/app/components/interpreters";
import {Dispatch, SetStateAction, useState} from "react";
import {TextTheoryCraftingUI} from "@/app/components/crafting-uis";

const baseEntrySetter = (hookSetter: Dispatch<SetStateAction<string[]>>) => (
    (index: number, value: string) => {
        hookSetter((previous) => {
            const next = [...previous];
            next[index] = value;
            return next;
        });
    }
);

export default function Content() {
    const [entries, setEntries] = useState<string[]>([]);
    const [theory, setTheory] = useState<Text>({content: "", entries: []});
    return (
        <div>
            <TextTheoryCraftingUI value={theory} setValue={setTheory} />
            <TextTheoryInterpreter
                entries={entries}
                setEntry={baseEntrySetter(setEntries)}
                materialInfo={theory}
                validate={() => {}}
            />
        </div>
    );
}
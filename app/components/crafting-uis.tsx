import { useRef } from "react";
import { Text } from "./interpreters";

export type CraftingUIProps<T> = {
    value: T;
    setValue: (value: T) => void;
};

function TextTheoryCraftingUI({ value, setValue }: CraftingUIProps<Text>) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const updateEntries = (nextEntries: [number, string][]) => {
        setValue({ ...value, entries: nextEntries });
    };

    const addBlank = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        if (start === end) return;

        const selectedText = value.content.slice(start, end);
        const trimmedSelection = selectedText.trim();
        const answer = trimmedSelection || "...";

        const nextContent = value.content.slice(0, start) + value.content.slice(end);
        const nextEntries = value.entries
            .map(([index, expected]) => {
                if (index >= end) {
                    return [index - (end - start), expected] as [number, string];
                }

                if (index >= start) {
                    return [start, expected] as [number, string];
                }

                return [index, expected] as [number, string];
            })
            .concat([[start, answer]])
            .sort(([left], [right]) => left - right);

        setValue({
            ...value,
            content: nextContent,
            entries: nextEntries,
        });
    };

    const updateBlankAnswer = (index: number, answer: string) => {
        updateEntries(
            value.entries.map(([entryIndex, expected]) =>
                entryIndex === index ? [entryIndex, answer] : [entryIndex, expected]
            ) as [number, string][]
        );
    };

    const removeBlank = (index: number) => {
        const blank = value.entries.find(([entryIndex]) => entryIndex === index);
        if (!blank) return;

        const [entryIndex, answer] = blank;
        const nextContent = value.content.slice(0, entryIndex) + answer + value.content.slice(entryIndex);
        const nextEntries = value.entries.filter(([entryIndexValue]) => entryIndexValue !== index);

        setValue({
            ...value,
            content: nextContent,
            entries: nextEntries,
        });
    };

    const entryIndexes = new Set(value.entries.map(([index]) => index));
    const previewNodes: Array<{ type: "text"; value: string } | { type: "input"; index: number }> = [];
    let buffer = "";

    value.content.split("").forEach((char, index) => {
        if (entryIndexes.has(index)) {
            if (buffer) {
                previewNodes.push({ type: "text", value: buffer });
                buffer = "";
            }
            previewNodes.push({ type: "input", index });
            return;
        }

        buffer += char;
    });

    if (buffer) {
        previewNodes.push({ type: "text", value: buffer });
    }

    return (
        <div className="space-y-4 rounded border border-menus/80 bg-menus p-4">
            <label className="block text-sm font-medium text-foreground">
                Text content
                <textarea
                    ref={textareaRef}
                    value={value.content}
                    onChange={(event) => setValue({ ...value, content: event.target.value })}
                    className="mt-2 min-h-28 w-full rounded border border-menus/80 bg-white/5 p-2 text-sm outline-none focus:border-amber-500!"
                />
            </label>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={addBlank}
                    className="rounded bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-500"
                >
                    Add blank at selection
                </button>
            </div>

            <div>
                <p className="mb-2 text-sm font-medium text-foreground">Blank answers</p>
                <div className="space-y-2">
                    {value.entries.length === 0 && (
                        <p className="text-sm text-muted-foreground">No blank defined yet.</p>
                    )}

                    {value.entries.map(([index, answer], entryIndex) => (
                        <div key={`${index}-${entryIndex}`} className="flex items-center gap-2">
                            <span className="min-w-10 text-sm text-muted-foreground">#{entryIndex + 1}</span>
                            <input
                                type="text"
                                value={answer}
                                onChange={(event) => updateBlankAnswer(index, event.target.value)}
                                className="flex-1 rounded border border-menus/80 bg-white/5 px-2 py-1 text-sm outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => removeBlank(index)}
                                className="rounded border border-red-500/60 px-2 py-1 text-xs text-red-300 hover:bg-red-500/10"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className="mb-2 text-sm font-medium text-foreground">Preview</p>
                <div className="rounded border border-menus/80 bg-white/5 p-3 text-sm leading-relaxed">
                    {previewNodes.map((node, index) => {
                        if (node.type === "text") {
                            return <span key={`preview-text-${index}`}>{node.value === " " ? "\u00A0" : node.value}</span>;
                        }

                        return (
                            <input
                                key={`preview-input-${node.index}`}
                                type="text"
                                value={value.entries.find(([entryIndex]) => entryIndex === node.index)?.[1] ?? ""}
                                readOnly
                                className="mx-1 inline-block w-24 align-middle rounded border border-amber-500 bg-menus px-2 py-0.5 text-sm outline-none"
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export { TextTheoryCraftingUI };
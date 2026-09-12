import {useState} from "react";

/**
 * Every interpreter should have a validate button at the end, who calls the validate function and shows the errors
 */
type InterpreterProps<T> = {
    entries: string[];
    setEntry: (index: number, value: string) => void;
    materialInfo: T;
    validate: (score: number, errors: number[]) => void;
};

type Text = {
    content: string;
    entries: [number, string][];
};

function TextTheoryInterpreter({ entries, setEntry, materialInfo, validate }: InterpreterProps<Text>) {
    const entryIndexes = new Set(materialInfo.entries.map(([index]) => index));
    const nodes: Array<{ type: "text"; value: string } | { type: "input"; index: number }> = [];
    let buffer = "";
    const [result, setResult] = useState<boolean[]>([]);

    materialInfo.content.split("").forEach((char, index) => {
        if (entryIndexes.has(index)) {
            if (buffer) {
                nodes.push({ type: "text", value: buffer });
                buffer = "";
            }
            nodes.push({ type: "input", index });
            return;
        }

        buffer += char;
    });

    if (buffer) {
        nodes.push({ type: "text", value: buffer });
    }

    const handleValidate = () => {
        const nextResult: boolean[] = [];
        const errors: number[] = [];

        materialInfo.entries.forEach(([index, expectedValue]) => {
            const isCorrect = (entries[index] ?? "").trim().toLowerCase() === expectedValue.trim().toLowerCase();
            nextResult[index] = isCorrect;

            if (!isCorrect) {
                errors.push(index);
            }
        });

        setResult(nextResult);
        validate(nextResult.filter(Boolean).length, errors);
    };

    return (
        <div className="text-selection-uniform leading-relaxed">
            {nodes.map((node, index) => {
                if (node.type === "text") {
                    return (
                        <span
                            key={`text-${index}`}
                            className="cursor-text select-text rounded-sm px-0.5"
                            style={{
                                display: "inline",
                                whiteSpace: "normal",
                                userSelect: "text",
                                WebkitUserSelect: "text",
                            }}
                        >
                            {node.value === " " ? "\u00A0" : node.value}
                        </span>
                    );
                }

                return (
                    <input
                        key={`input-${node.index}`}
                        type="text"
                        value={entries[node.index] ?? ""}
                        onChange={(event) => setEntry(node.index, event.target.value)}
                        className={
                            "mx-1 inline-block w-24 align-middle rounded border bg-menus px-2 py-1 text-sm outline-none " +
                            (result[node.index] === undefined
                                ? "border-menus/80"
                                : result[node.index]
                                    ? "border-green-500"
                                    : "border-red-500")
                        }
                    />
                );
            })}
            <button type="button" onClick={handleValidate} className="mt-2 rounded bg-amber-600 px-3 py-1 text-sm font-medium text-white hover:bg-amber-500">
                Validate
            </button>
        </div>
    );
}

type Infographic = {
    imageUrl: string;
    entries: {
        x: number;
        y: number;
        answer: string;
    }[];
};

// TODO infographic theory interpreter, crafting ui, and theory type
function InfographicTheoryInterpreter({ entries, setEntry, materialInfo }: InterpreterProps<Infographic>) {
    return (
        <div className="relative inline-block">
            {materialInfo.imageUrl && (
                <div
                    aria-label="Theory infographic"
                    className="block max-w-full rounded"
                    style={{
                        backgroundImage: `url("${materialInfo.imageUrl}")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        minHeight: "200px",
                        minWidth: "160px",
                    }}
                />
            )}

            {materialInfo.entries.map((entry, index) => (
                <input
                    key={`${entry.x}-${entry.y}-${index}`}
                    type="text"
                    value={entries[index] ?? ""}
                    onChange={(event) => setEntry(index, event.target.value)}
                    style={{
                        position: "absolute",
                        left: `${entry.x}px`,
                        top: `${entry.y}px`,
                        width: "96px",
                    }}
                    className="rounded border border-menus/80 bg-menus px-2 py-1 text-sm outline-none focus:border-amber-500"
                />
            ))}
        </div>
    );
}

export { TextTheoryInterpreter, InfographicTheoryInterpreter };
export type { InterpreterProps, Text, Infographic };
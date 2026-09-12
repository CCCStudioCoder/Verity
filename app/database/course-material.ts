import { ReactNode } from "react";
import { CraftingUIProps, TextTheoryCraftingUI } from "../components/crafting-uis";
import { InterpreterProps, Text, TextTheoryInterpreter } from "../components/interpreters";

type CourseMaterialMeta = {
    name: string;
    description: string;
    course: string;
    level: string;
    author:  string;
};

type Vocabulary<M extends readonly string[] = string[]> = {
  isForeignLanguage: boolean;
  metaInformation: M;
  wordList: {
    word: string;
    meaning: string;
    metaValues: { [K in keyof M]: string };
  }[];
} & CourseMaterialMeta;

type TheoryMaterialType<T> = { 
  type: string;
  interpreter: (props: InterpreterProps<T>) => ReactNode;
  craftingUI: (props: CraftingUIProps<T>) => ReactNode;
}

const TextTheory: TheoryMaterialType<Text> = {
  type: "Théorie textuelle",
  interpreter: TextTheoryInterpreter,
  craftingUI: TextTheoryCraftingUI,
};

type Theory<T extends readonly unknown[]> = {
  title: string
  content: [string, TheoryMaterialType<T[number]>][]
} & CourseMaterialMeta;

type CourseMaterial = Vocabulary|Theory<readonly unknown[]>;

export type { CourseMaterial, CourseMaterialMeta, Vocabulary, Theory };
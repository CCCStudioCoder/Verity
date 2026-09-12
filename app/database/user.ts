import { Test } from "./agenda";
import { Course } from "./course";
import { Stats } from "./stats";

export type User = {
    name: string;
    definedTests: Test[];
    courses: Course[];
    stats: Stats;
};
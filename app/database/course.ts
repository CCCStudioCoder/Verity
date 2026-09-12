import { CourseMaterial } from "./course-material";

export type Course = {
    name: string;
    image: string;
    assets: CourseMaterial[];
};
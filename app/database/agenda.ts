export type Test = {
    name: string;
    course: string;
    associatedMaterial: string; // should be equal to one of the defined courses of the user
    date: Date;
    rating?: number; // rating = num/100
};
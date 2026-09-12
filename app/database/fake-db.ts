import { User } from "./user";

export const fakeUser: User = {
    name: "Dev",
    definedTests: [
        {
            name: "Test 1",
            course: "Mathématiques",
            associatedMaterial: "Cours 1",
            date: new Date("2026-09-15")
        },
        {
            name: "Test 2",
            course: "Français",
            associatedMaterial: "Cours 2",
            date: new Date("2026-09-17")
        },
        {
            name: "Test 3",
            course: "Sciences",
            associatedMaterial: "Cours 3",
            date: new Date("2026-10-02")
        },
    ],
    courses: [
        {
            name: "Mathématiques",
            image: "https://openlearning.mit.edu/sites/default/files/styles/event_news_detail/public/1%2ADKBxItEBzRDm9I2Qe_S1vw.jpeg?itok=kccIJ4a7",
            assets: []
        }
    ],
    stats: {
        doneTests: 5,
        averageRating: 72
    },
};
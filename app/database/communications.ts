import { Test } from "./agenda";
import { fakeUser } from "./fake-db";
import { User } from "./user";

export function getUser(): User {
    return fakeUser;
}

export function getTests(past?: boolean): Test[] {
    let allTests = getUser().definedTests.sort((a, b) => a.date.getTime() - b.date.getTime());
    const currentDate = new Date();

    if(past) {
        allTests = allTests.filter(test => test.date.getTime() < currentDate.getTime());
    } else if(past === false) {
        allTests = allTests.filter(test => test.date.getTime() > currentDate.getTime());
    }
    
    return allTests;
}

/**
 * @param badFactor The percentage of the average results under which the test is considered as "bad"
 */
export function getBadTests(badFactor: number = 60): Test[] {
    const badLimit = getUser().stats.averageRating * badFactor / 100;
    return getTests(true).filter(test => test.rating && test.rating < badLimit )
}
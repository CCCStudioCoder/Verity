import { getUser } from "../database/communications";
import { User } from "../database/user";

const soonAppelationDelay = 14 * 24 * 60 * 60 * 1000;

export default function DashBoard() {
    const currentDate = new Date().getTime();
    const user: User = getUser();
    return (
        <div>
            <div className="grid grid-cols-4 grid-rows-[328px_216px_400px_400px] gap-8 m-16">
                <h1 className="page-title">
                    Bonjour {user.name}
                </h1>
                <section className="panel pre-ratio" data-content-ratio="1/1">
                    <span>Révision</span>
                    <div></div>
                </section>
                <section className="panel pre-ratio" data-content-ratio="1/1">
                    <span>Non-aquis</span>
                    <div></div>
                </section>
                <section className="panel pre-ratio" data-content-ratio="1/1">
                    <span>Non-aquis</span>
                    <div></div>
                </section>
                <section className="panel col-span-4 pre-ratio" data-content-ratio="1/8">
                    <span>Agenda</span>
                    <div></div>
                </section>
                <section className="panel row-span-2">
                    <span>League</span>
                    <div></div>
                </section>
                <section className="panel col-span-3">
                    <span>Stats</span>
                    <div></div>
                </section>
                <section className="panel col-span-3" data-content-ratio="1/1">
                    <span>Your content</span>
                    <div></div>
                </section>
            </div>
        </div>
    );
}

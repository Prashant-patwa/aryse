// named vs default export 
import { Outlet } from "react-router"; // named export a massive file/library exports too many things like Outlet, Link, ... 
import Header from "./Header"; // default export when it shares 1 main thing.
import Footer from "./Footer";

export default function Layout() {
    return (
        /* a div to manage styling especially flex and all - it has some work thats why we do it */
    <div className="flex flex-col min-h-screen">
        <Header />
            <main className=" bg-slate-100 grow">
                <Outlet />
            </main>
        <Footer />
    </div>
    )
}
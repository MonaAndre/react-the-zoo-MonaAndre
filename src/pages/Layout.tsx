import "../styling/Layout.css"
import { NavLink, Outlet } from "react-router-dom"

export const Layout = () => {

    return <>
        <header className="header">
            <nav>
                <ul className="menu-list">
                    <li className="menu-list__item">
                        <NavLink to={"/react-the-zoo-MonaAndre/"}>Hem</NavLink>
                    </li>
                    <li className="menu-list__item">
                        <NavLink to={"/react-the-zoo-MonaAndre/animals"}>Djur</NavLink>
                    </li>

                </ul>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            Djurparken
        </footer>
    </>
}
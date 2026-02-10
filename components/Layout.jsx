import BottomNav from './BottomNav';

/**
 * Layout Component
 * Wraps pages in a consistent container and includes the BottomNav.
 */
export default function Layout({ children }) {
    return (
        <div className="app-container">
            <main className="content">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}

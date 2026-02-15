import BottomNav from './BottomNav';
import WelcomeScreen from './WelcomeScreen';

/**
 * Layout Component
 * Wraps pages in a consistent container and includes the BottomNav.
 */
export default function Layout({ children }) {
    return (
        <div className="app-container">
            <WelcomeScreen />
            <main className="content">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}

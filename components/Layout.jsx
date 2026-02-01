import BottomNav from './BottomNav';

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

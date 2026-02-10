# Lumi - Daily Fare Companion

Lumi is a Next.js application designed to help users track their daily transportation fares. It provides a simple, mobile-friendly interface for adding trips, viewing history, and analyzing spending statistics.

## ✨ Features

- Add Trips: Quickly log transportation costs (Bus, Train, Uber, etc.).
- Dashboard: View daily limits and recent transactions.
- History: Browse past trips grouped by date with search functionality.
- Statistics: Visualize spending with weekly charts and view high-cost trips.
- Fare Context: Uses React Context for state management of transactions.

## 🛠️ Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd Tracker
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

## 🚀 How to Run

1.  Start the development server:**
    ```bash
    npm run dev
    ```

2.  Open your browser:
    Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Folder Structure

```
Tracker/
├── app/                  # Next.js App Router
│   ├── page.js           # Splash/Welcome screen
│   ├── dashboard/        # Main dashboard
│   ├── add/              # Add trip form
│   ├── history/          # Transaction history with search/grouping
│   ├── stats/            # Statistics and charts
│   └── layout.js         # Root layout (likely wraps providers)
├── components/           # Reusable UI components
│   ├── BottomNav.jsx     # Mobile bottom navigation
│   ├── SpendingChart.jsx # Doughnut chart for spending
│   ├── WeeklyChart.jsx   # Bar chart for weekly analysis
│   └── FareCard.jsx      # Display card for individual trips
├── context/
│   └── FareContext.js    # Global state for transactions
├── public/               # Static assets (images, icons)
└── utils/                # Helper functions (if any)
```

## 📝 Technologies Used

- Framework: [Next.js](https://nextjs.org/)
- Styling: Inline styles & CSS Modules (for specific components).
- Icons: [Lucide React](https://lucide.dev/)
- Charts: [React Chartjs 2](https://react-chartjs-2.js.org/)

## 📄 License


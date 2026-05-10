import { useState } from "react";

function App() {
    const [activePage, setActivePage] = useState("dashboard");

    const navItems = [
        "Dashboard",
        "My Trips",
        "Create Trip",
        "Budget",
        "Profile",
    ];

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#07101d",
                color: "#ffffff",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Sidebar */}
            <div
                style={{
                    width: "240px",
                    backgroundColor: "#0e1a28",
                    borderRight: "1px solid #1f2d3d",
                    padding: "20px",
                }}
            >
                <h1
                    style={{
                        marginBottom: "40px",
                        fontSize: "2rem",
                    }}
                >
                    Traveloop
                </h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActivePage(item)}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                backgroundColor:
                                    activePage === item ? "#1e3a5f" : "transparent",
                                color: "#ffffff",
                                textAlign: "left",
                                fontSize: "1rem",
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    padding: "40px",
                }}
            >
                <h2
                    style={{
                        fontSize: "2rem",
                        marginBottom: "10px",
                    }}
                >
                    {activePage}
                </h2>

                <p style={{ color: "#b0b0b0", marginBottom: "30px" }}>
                    Personalized travel planning platform.
                </p>

                {/* Dashboard Mock */}
                {activePage === "Dashboard" && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {[
                            {
                                title: "Japan Spring Trip",
                                city: "Tokyo, Kyoto, Osaka",
                            },
                            {
                                title: "Europe Backpacking",
                                city: "Paris, Rome, Prague",
                            },
                            {
                                title: "Goa Weekend",
                                city: "Goa",
                            },
                        ].map((trip) => (
                            <div
                                key={trip.title}
                                style={{
                                    backgroundColor: "#0e1a28",
                                    border: "1px solid #1f2d3d",
                                    borderRadius: "12px",
                                    padding: "20px",
                                }}
                            >
                                <h3>{trip.title}</h3>

                                <p style={{ color: "#b0b0b0" }}>{trip.city}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Placeholder Screens */}
                {activePage !== "Dashboard" && (
                    <div
                        style={{
                            backgroundColor: "#0e1a28",
                            border: "1px solid #1f2d3d",
                            borderRadius: "12px",
                            padding: "30px",
                        }}
                    >
                        <h3>{activePage} Module</h3>

                        <p style={{ color: "#b0b0b0" }}>
                            This section is currently under development.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
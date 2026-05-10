import React, { useEffect, useState } from "react";

function App() {
    const [activePage, setActivePage] = useState("Dashboard");

    useEffect(() => {
        fetch("http://localhost:5000/api/trips")
            .then((res) => res.json())
            .then((data) => {
                setTrips(data);
            })
            .catch((err) => {
                console.error("API Error:", err);
            });
    }, []);

    const [trips, setTrips] = useState([]);

    const navItems = [
        "Dashboard",
        "My Trips",
        "Create Trip",
        "Itinerary",
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

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
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

                <p
                    style={{
                        color: "#b0b0b0",
                        marginBottom: "30px",
                    }}
                >
                    Personalized multi-city travel planning platform.
                </p>

                {/* Dashboard */}
                {activePage === "Dashboard" && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {trips.map((trip) => (
                            <div
                                key={trip.id}
                                style={{
                                    backgroundColor: "#0e1a28",
                                    border: "1px solid #1f2d3d",
                                    borderRadius: "14px",
                                    padding: "20px",
                                }}
                            >
                                <h3>{trip.title}</h3>

                                <p style={{ color: "#b0b0b0" }}>
                                    {trip.destination}
                                </p>

                                <p>
                                    <strong>Budget:</strong> {trip.budget}
                                </p>

                                <p>
                                    <strong>Status:</strong> {trip.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* My Trips */}
                {activePage === "My Trips" && (
                    <div>
                        {trips.map((trip) => (
                            <div
                                key={trip.id}
                                style={{
                                    backgroundColor: "#0e1a28",
                                    border: "1px solid #1f2d3d",
                                    borderRadius: "12px",
                                    padding: "20px",
                                    marginBottom: "20px",
                                }}
                            >
                                <h3>{trip.title}</h3>

                                <p>{trip.destination}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Trip */}
                {activePage === "Create Trip" && (
                    <div
                        style={{
                            backgroundColor: "#0e1a28",
                            padding: "30px",
                            borderRadius: "12px",
                            maxWidth: "600px",
                        }}
                    >
                        <div style={{ marginBottom: "20px" }}>
                            <label>Trip Name</label>

                            <input
                                type="text"
                                placeholder="Enter trip title"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label>Destination</label>

                            <input
                                type="text"
                                placeholder="Enter destinations"
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label>Budget</label>

                            <input
                                type="number"
                                placeholder="Enter estimated budget"
                                style={inputStyle}
                            />
                        </div>

                        <button style={buttonStyle}>
                            Create Trip
                        </button>
                    </div>
                )}

                {/* Itinerary */}
                {activePage === "Itinerary" && (
                    <div
                        style={{
                            backgroundColor: "#0e1a28",
                            borderRadius: "12px",
                            padding: "30px",
                        }}
                    >
                        <h3>Travel Timeline</h3>

                        <ul style={{ lineHeight: "2rem" }}>
                            <li>Day 1 — Arrival in Tokyo</li>
                            <li>Day 2 — Tokyo City Tour</li>
                            <li>Day 3 — Travel to Kyoto</li>
                            <li>Day 4 — Kyoto Temple Visit</li>
                            <li>Day 5 — Osaka Food Exploration</li>
                        </ul>
                    </div>
                )}

                {/* Budget */}
                {activePage === "Budget" && (
                    <div
                        style={{
                            backgroundColor: "#0e1a28",
                            borderRadius: "12px",
                            padding: "30px",
                            maxWidth: "500px",
                        }}
                    >
                        <h3>Total Budget</h3>

                        <h1>$4200</h1>

                        <div
                            style={{
                                height: "20px",
                                backgroundColor: "#1f2d3d",
                                borderRadius: "20px",
                                overflow: "hidden",
                                marginTop: "20px",
                            }}
                        >
                            <div
                                style={{
                                    width: "70%",
                                    backgroundColor: "#3b82f6",
                                    height: "100%",
                                }}
                            />
                        </div>

                        <p style={{ marginTop: "10px", color: "#b0b0b0" }}>
                            70% of estimated budget allocated.
                        </p>
                    </div>
                )}

                {/* Profile */}
                {activePage === "Profile" && (
                    <div
                        style={{
                            backgroundColor: "#0e1a28",
                            borderRadius: "12px",
                            padding: "30px",
                            maxWidth: "500px",
                        }}
                    >
                        <h3>User Profile</h3>

                        <p>Name: Aman Kumar</p>

                        <p>Email: aman@example.com</p>

                        <p>Total Trips Planned: 12</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #1f2d3d",
    backgroundColor: "#07101d",
    color: "white",
};

const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
};

export default App;
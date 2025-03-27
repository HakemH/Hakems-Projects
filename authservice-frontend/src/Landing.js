import React from "react";
import "./Landing.css"; // Create a Landing.css file for styling

const Landing = () => {
    return (
        <div className="landing-container">
            <div className="game-area">
                {/* Placeholder for your game */}
                <button className="play-button">Play</button>
            </div>
            <div className="coming-soon-grid">
                <div className="coming-soon-item">
                    <img src="placeholder1.jpg" alt="Coming Soon 1" />
                </div>
                <div className="coming-soon-item">
                    <img src="placeholder2.jpg" alt="Coming Soon 2" />
                </div>
                <div className="coming-soon-item">
                    <img src="placeholder3.jpg" alt="Coming Soon 3" />
                </div>
                <div className="coming-soon-item">
                    <img src="placeholder4.jpg" alt="Coming Soon 4" />
                </div>
            </div>
        </div>
    );
};

export default Landing;
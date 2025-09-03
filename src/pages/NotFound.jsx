import React from "react";
import '../styles/notfound.css';

const NotFound = () => (
    <div className="notfound-container">
        <img
            src="https://illustrations.popsy.co/gray/error-404.svg"
            alt="404 Not Found"
            className="notfound-image"
        />
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-message">
            Sorry, the page you are looking for does not exist.
        </p>
        <a href="/" className="notfound-link">
            Go Home
        </a>
    </div>
);

export default NotFound;

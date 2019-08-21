import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.sass';
export default function NotFound() {
    return (
        <main className="not-found-component">
            <div className="row center-x center-y">
                <img
                    src="/assets/not-found-frown.png"
                    alt="#"
                />
            </div>
            <h1>
                <b>
                    Sorry, this page isn't available.
                </b>
            </h1>
            <p>
                The link you followed may be broken or the page may not exist. <Link to="/">Go back to TimeLike</Link>.
            </p>
        </main>
    )
}

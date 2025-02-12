import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="p-4 text-center">
            <h1 className="text-3xl font-bold">Oops!</h1>
            <p>Sorry, an unexpected error occurred.</p>
            <pre className="mt-4 bg-gray-100 p-3 rounded">{JSON.stringify(error, null, 2)}</pre>
        </div>
    );
};

export default ErrorPage;

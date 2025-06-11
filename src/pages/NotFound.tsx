import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h1>
          <p className="mt-2 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
          <div className="mt-6">
            <Link to="/" className="btn-primary">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
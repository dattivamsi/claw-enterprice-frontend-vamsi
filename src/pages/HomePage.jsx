import { Link } from 'react-router-dom';

// Example in HomePage.js
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the To-Do App</h1>
      <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to continue.</p>
    </div>
  );
};

export default HomePage
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>COMP3123 Assignment 2</h1>
      <p>
        <Link to="/signup">Sign up</Link> or <Link to="/login">Login</Link> to
        begin!
      </p>
    </div>
  );
}

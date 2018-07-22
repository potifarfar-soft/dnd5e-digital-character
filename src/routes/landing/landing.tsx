import * as React from 'react';
import { Link } from 'react-router-dom';
import './style';

export const Landing = () => (
  <div className="landing">
    <div>
      <h1>Landing page</h1>
      <Link to="/home"><h4>Continue to Potifarfar »</h4></Link>
    </div>
  </div>
);

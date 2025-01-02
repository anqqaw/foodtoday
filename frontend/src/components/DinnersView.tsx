import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './DinnersView.css';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:9000';

const DinnersView: React.FC = () => {
  const [dinners, setDinners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDinners = async () => {
      const token = localStorage.getItem('googleAuthToken');
      if (token) {
        try {
          const response = await axios.get(`${ENDPOINT}/api/dinners`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(response.data);
          setDinners(response.data.dinners);
        } catch (error) {
          console.error('Error fetching dinners:', error);
        }
      }
    };

    fetchDinners();
  }, []);

  return (
    <div className="dinners-container">
      <h2 className="dinners-title">Available Dinners</h2>
      <ul className="dinners-list">
        {dinners.map((dinner: any) => (
          <li key={dinner.id} className="dinner-item">
            <h4>{dinner.title}</h4>
            <p>{dinner.description}</p>
            <p>Difficulty: {dinner.difficulty}</p>
            <p>Preparation Time: {dinner.preparationTime} minutes</p>
            <p>Total Time: {dinner.totalTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DinnersView;

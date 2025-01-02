import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Dinners</h2>
      <ul className="space-y-4">
        {dinners.map((dinner: any) => (
          <li key={dinner.id} className="p-4 bg-white rounded shadow">
            <h4 className="text-xl font-semibold">{dinner.title}</h4>
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

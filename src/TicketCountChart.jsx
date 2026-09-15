import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const API_URL = 'https://mern-back-comptag-sam.vercel.app/api/tickets';

export default function TicketCountChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndCountTickets = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const tickets = await response.json();

        // 1. Group and count number of tickets per person ("qui")
        const countsMap = tickets.reduce((acc, ticket) => {
          const person = ticket.qui || 'Unknown';
          acc[person] = (acc[person] || 0) + 1;
          return acc;
        }, {});

        // 2. Format object to array for Recharts
        const formattedData = Object.entries(countsMap).map(([person, count]) => ({
          qui: person,
          count
        }));

        setChartData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCountTickets();
  }, []);

  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (chartData.length === 0) return <p>No ticket data available.</p>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Ticket Count by Person</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="qui" />
          <YAxis 
            allowDecimals={false} 
            label={{ value: 'Number of Tickets', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip />
          <Bar dataKey="count" name="Tickets" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
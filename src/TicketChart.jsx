import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const API_URL = 'https://mern-back-comptag-sam.vercel.app/api/tickets';

// Distinct colors for different people (qui)
const PERSON_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00c49f', '#ffbb28'
];

export default function TicketChart() {
  const [chartData, setChartData] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndFormatTickets = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const tickets = await response.json();

        // 1. Extract unique people ("qui")
        const uniquePeople = Array.from(new Set(tickets.map((t) => t.qui).filter(Boolean)));
        setPeople(uniquePeople);

        // 2. Group and aggregate "combien" by dateInput and "qui"
        const groupedMap = tickets.reduce((acc, ticket) => {
          if (!ticket.dateInput) return acc;

          // Format dateInput to YYYY-MM-DD
          const dateKey = new Date(ticket.dateInput).toISOString().split('T')[0];

          if (!acc[dateKey]) {
            acc[dateKey] = { date: dateKey };
            // Initialize 0 for each person on this date
            uniquePeople.forEach((p) => {
              acc[dateKey][p] = 0;
            });
          }

          acc[dateKey][ticket.qui] = (acc[dateKey][ticket.qui] || 0) + (Number(ticket.combien) || 0);
          return acc;
        }, {});

        // 3. Convert map back to array and sort chronologically by date
        const formattedData = Object.values(groupedMap).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setChartData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFormatTickets();
  }, []);

  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (chartData.length === 0) return <p>No ticket data available.</p>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Tickets Summary by Date & Person</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Combien (€)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {/* Dynamically render a Bar for each person found in the API */}
          {people.map((person, index) => (
            <Bar
              key={person}
              dataKey={person}
              name={person}
              fill={PERSON_COLORS[index % PERSON_COLORS.length]}
              stackId="a" // Remove stackId="a" if you prefer side-by-side bars
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
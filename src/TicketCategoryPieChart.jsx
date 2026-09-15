import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const API_URL = 'https://mern-back-comptag-sam.vercel.app/api/tickets';

// Distinct colors for different categories (quoi)
const CATEGORY_COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff7300'
];

export default function TicketCategoryPieChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndAggregateCategories = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const tickets = await response.json();

        // 1. Group and aggregate total amount ("combien") by category ("quoi")
        const categoryMap = tickets.reduce((acc, ticket) => {
          const category = ticket.quoi || 'Uncategorized';
          const amount = Number(ticket.combien) || 0;
          acc[category] = (acc[category] || 0) + amount;
          return acc;
        }, {});

        // 2. Format object into Recharts-friendly array structure
        const formattedData = Object.entries(categoryMap).map(([category, value]) => ({
          name: category,
          value
        }));

        setChartData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAggregateCategories();
  }, []);

  if (loading) return <p>Loading chart data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (chartData.length === 0) return <p>No ticket data available.</p>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Expenses Breakdown by Category (Quoi)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={130}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} €`, 'Total']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
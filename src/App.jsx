import TicketChart from './TicketChart';
import TicketCountChart from './TicketCountChart';
import TicketCategoryPieChart from './TicketCategoryPieChart';

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>ComptagSAM Dashboard</h1>
      <TicketChart />
      <TicketCountChart />
      <TicketCategoryPieChart />
    </div>
  );
}

export default App;
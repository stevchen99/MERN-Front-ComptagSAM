import TicketChart from './TicketChart';
import TicketCountChart from './TicketCountChart';
import TicketCategoryPieChart from './TicketCategoryPieChart';

function App() {
  return (
    <div style={{ padding: '2rem', width: '100%', maxWidth: '1400px', margin: '0 auto', boxSizing: 'border-box' }}>
      <h1 style={{ marginBottom: '2rem' }}>ComptagSAM Dashboard</h1>

      {/* Grid wrapper forcing 2 columns on desktop */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}
      >
        <TicketChart />
        <TicketCountChart />
        <div style={{ gridColumn: '1 / -1', width: '100%' }}>
          <TicketCategoryPieChart />
        </div>
      </div>
    </div>
  );
}

export default App;
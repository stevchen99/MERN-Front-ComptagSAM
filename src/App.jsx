import TicketChart from './TicketChart';
import TicketCountChart from './TicketCountChart';
import TicketCategoryPieChart from './TicketCategoryPieChart';

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>ComptagSAM Dashboard</h1>

      {/* Grid Layout Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Top Left: Ticket Chart */}
        <div>
          <TicketChart />
        </div>

        {/* Top Right: Ticket Count Chart */}
        <div>
          <TicketCountChart />
        </div>

        {/* Bottom Full Width: Category Pie Chart */}
        <div style={{ gridColumn: '1 / -1' }}>
          <TicketCategoryPieChart />
        </div>
      </div>
    </div>
  );
}

export default App;
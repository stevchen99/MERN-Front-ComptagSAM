import TicketChart from './TicketChart';
import TicketCountChart from './TicketCountChart';
import TicketCategoryPieChart from './TicketCategoryPieChart';

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>ComptagSAM Dashboard</h1>

      {/* Top Row Container */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '2rem', 
          marginBottom: '2rem' 
        }}
      >
        <div style={{ flex: '1 1 450px', minWidth: 0 }}>
          <TicketChart />
        </div>
        <div style={{ flex: '1 1 450px', minWidth: 0 }}>
          <TicketCountChart />
        </div>
      </div>

      {/* Bottom Chart */}
      <div style={{ width: '100%' }}>
        <TicketCategoryPieChart />
      </div>
    </div>
  );
}

export default App;
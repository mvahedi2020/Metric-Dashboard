import { 
  BarChart3, 
  Users, 
  Activity, 
  ArrowUpRight, 
  LayoutDashboard,
  Settings,
  Bell,
  Search
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-zinc-800/60 bg-zinc-950/50 p-6 sm:flex backdrop-blur-xl">
        <div className="flex items-center gap-3 font-semibold tracking-tight text-xl mb-10">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          VantageMetrics
        </div>
        
        <nav className="space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
          <NavItem icon={<Users size={18} />} label="Team Velocity" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="mt-auto rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
          <p className="text-sm font-medium text-zinc-300">Pro Plan Active</p>
          <p className="mt-1 text-xs text-zinc-500">24/100 team seats used</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-[24%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-zinc-800/60 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800/50 w-96 focus-within:border-indigo-500/50 transition-colors">
            <Search size={16} className="text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search metrics, projects..." 
              className="bg-transparent text-sm outline-none w-full text-zinc-200 placeholder:text-zinc-600"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors relative">
              <Bell size={18} className="text-zinc-400" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border-2 border-zinc-800 shadow-sm"></div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Agile Performance
              </h1>
              <p className="text-zinc-500 mt-1">Your team is operating at 94% efficiency this sprint.</p>
            </div>
            <button className="rounded-full bg-white text-zinc-950 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
              Generate Report <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
            <MetricCard 
              title="Sprint Velocity" 
              value="42 pts" 
              trend="+12%" 
              trendUp 
            />
            <MetricCard 
              title="Time to Market" 
              value="14 days" 
              trend="-3 days" 
              trendUp 
            />
            <MetricCard 
              title="Active Bugs" 
              value="8" 
              trend="+2" 
              trendUp={false} 
            />
          </div>

          {/* Main Chart Area */}
          <div className="h-96 w-full rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h2 className="font-semibold text-lg mb-6">Burndown Trajectory</h2>
            
            {/* Mock Chart UI */}
            <div className="h-64 w-full flex items-end justify-between gap-2 px-2 pb-2 border-b border-l border-zinc-800/50 relative">
              {/* Grid lines */}
              <div className="absolute w-full h-[1px] bg-zinc-800/30 bottom-1/4"></div>
              <div className="absolute w-full h-[1px] bg-zinc-800/30 bottom-2/4"></div>
              <div className="absolute w-full h-[1px] bg-zinc-800/30 bottom-3/4"></div>
              
              {/* Bars */}
              {[60, 50, 45, 30, 20, 15, 5].map((height, i) => (
                <div key={i} className="w-12 rounded-t-sm bg-gradient-to-t from-indigo-600/40 to-indigo-500/80 hover:from-indigo-500/60 hover:to-indigo-400 transition-colors group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] relative z-10" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between px-4 mt-3 text-xs text-zinc-500 font-mono">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${active ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'}`}>
      {icon}
      {label}
    </a>
  );
}

function MetricCard({ title, value, trend, trendUp }: { title: string, value: string, trend: string, trendUp: boolean }) {
  return (
    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-md hover:border-zinc-700 transition-colors">
      <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-4xl font-bold tracking-tight text-white">{value}</span>
        <span className={`text-sm font-medium ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

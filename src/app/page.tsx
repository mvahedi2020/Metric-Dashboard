import { auth, signIn, signOut } from "@/auth";
import { getJiraMetrics } from "@/lib/jira";
import { calculateSprintHealth } from "@/lib/insights";
import DashboardCanvas from "@/components/DashboardCanvas";
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

export default async function Home() {
  const session = await auth();
  const metrics = await getJiraMetrics();
  const sprintHealth = calculateSprintHealth(metrics.totalVelocity, metrics.activeBugs);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
        <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-xl shadow-2xl flex flex-col items-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6">
            <Activity className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome to VantageMetrics</h1>
          <p className="text-zinc-400 text-sm mb-8 text-center">Sign in to access your team's agile performance dashboard.</p>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
            className="w-full"
          >
            <button type="submit" className="w-full rounded-lg bg-white text-zinc-950 px-5 py-3 text-sm font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
              Sign in with GitHub
            </button>
          </form>
          
          <form
            action={async () => {
              "use server";
              await signIn("credentials", { redirectTo: "/" });
            }}
            className="w-full mt-3"
          >
            <button type="submit" className="w-full rounded-lg bg-zinc-800 text-white px-5 py-3 text-sm font-semibold hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 border border-zinc-700">
              Sign in as Guest (Demo)
            </button>
          </form>
        </div>
      </div>
    );
  }

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
          {[
            { icon: <LayoutDashboard size={18} />, label: "Overview", active: true },
            { icon: <BarChart3 size={18} />, label: "Analytics" },
            { icon: <Users size={18} />, label: "Team Velocity" },
            { icon: <Settings size={18} />, label: "Settings" }
          ].map((item) => (
            <NavItem 
              key={item.label} 
              icon={item.icon} 
              label={item.label} 
              active={item.active} 
            />
          ))}
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
            <form action={async () => {
              "use server";
              await signOut();
            }}>
              <button type="submit" title="Sign Out" className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-zinc-800 shadow-sm overflow-hidden hover:border-indigo-500 transition-colors">
                {session?.user?.image ? (
                  <img src={session.user.image} alt={session.user.name || "User Avatar"} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-tr from-purple-500 to-indigo-500"></div>
                )}
              </button>
            </form>
          </div>
        </header>

        <DashboardCanvas metrics={metrics} sprintHealth={sprintHealth} />
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

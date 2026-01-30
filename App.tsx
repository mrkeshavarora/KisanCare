
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  Settings, 
  Sprout, 
  Wind, 
  Droplets, 
  Thermometer, 
  FlaskConical, 
  AlertTriangle,
  Menu,
  X,
  ChevronRight,
  ShoppingBag,
  LogOut,
  User as UserIcon,
  Loader2
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import VisualAnalyzer from './components/VisualAnalyzer';
import Marketplace from './components/Marketplace';
import AuthScreen from './components/AuthScreen';
import { ViewType, SensorData, User } from './types';

const SESSION_KEY = 'kisaancare_session';

const SplashScreen: React.FC = () => (
  <div className="fixed inset-0 bg-emerald-900 z-[100] flex flex-col items-center justify-center overflow-hidden">
    <div className="relative">
      <div className="animate-float animate-logo-slide bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-500/20">
        <Sprout className="text-emerald-600 w-24 h-24" />
      </div>
      {/* Decorative particles */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-400 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-emerald-500 rounded-full blur-2xl animate-pulse delay-75" />
    </div>
    <div className="mt-12 text-center animate-text-pop">
      <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Kisaan Care</h1>
      <p className="text-emerald-50 font-semibold tracking-widest uppercase text-xs">Modernizing Indian Agriculture</p>
      <div className="mt-8 flex justify-center">
        <Loader2 className="text-emerald-400 animate-spin" size={24} />
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>({
    soilHumidity: 42,
    nitrogen: 120,
    phosphorus: 85,
    potassium: 110,
    soilPH: 6.5,
    temperature: 24,
    externalHumidity: 65
  });

  useEffect(() => {
    // Initial loading timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  // Mock real-time data fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        soilHumidity: Math.max(0, Math.min(100, prev.soilHumidity + (Math.random() - 0.5) * 2)),
        temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
        externalHumidity: Math.max(0, Math.min(100, prev.externalHumidity + (Math.random() - 0.5) * 1)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    setActiveView('dashboard');
  };

  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: ViewType }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setIsSidebarOpen(false);
      }}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${
        activeView === view 
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
          : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </button>
  );

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex animate-in fade-in duration-700">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 p-6 fixed h-full">
        <div className="flex items-center space-x-3 mb-10 px-2 group">
          <div className="bg-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
            <Sprout className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Kisaan <span className="text-emerald-600">Care</span></h1>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <NavItem icon={LayoutDashboard} label="Dashboard" view="dashboard" />
          <NavItem icon={Camera} label="Visual Analyzer" view="analyzer" />
          <NavItem icon={ShoppingBag} label="Marketplace" view="marketplace" />
          <NavItem icon={Settings} label="Settings" view="settings" />
        </nav>

        <div className="space-y-4">
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <div className="flex items-center space-x-2 text-emerald-800 mb-2">
              <AlertTriangle size={18} className="text-emerald-700" />
              <span className="text-sm font-bold">Field Alert</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              Frost warning for upcoming Tuesday. Prepare mulching for tomato plots.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-200">
                <UserIcon size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-600 truncate font-bold uppercase tracking-wider">{user.farmName}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-500 hover:text-rose-600 transition-colors p-1"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center space-x-2">
          <Sprout className="text-emerald-600" size={24} />
          <h1 className="text-lg font-bold text-slate-800">Kisaan Care</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-700">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}
      <aside className={`lg:hidden fixed top-0 bottom-0 left-0 w-64 bg-white z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center space-x-2 mb-8">
            <Sprout className="text-emerald-600" size={24} />
            <span className="font-bold text-xl text-slate-800">Kisaan Care</span>
          </div>
          <nav className="space-y-2 flex-grow">
            <NavItem icon={LayoutDashboard} label="Dashboard" view="dashboard" />
            <NavItem icon={Camera} label="Visual Analyzer" view="analyzer" />
            <NavItem icon={ShoppingBag} label="Marketplace" view="marketplace" />
            <NavItem icon={Settings} label="Settings" view="settings" />
          </nav>
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between p-3 mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <UserIcon size={16} />
                </div>
                <span className="text-sm font-bold text-slate-800">{user.name}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-all font-bold"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow lg:ml-72 pt-16 lg:pt-0 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {activeView === 'dashboard' && <Dashboard data={sensorData} user={user} />}
          {activeView === 'analyzer' && <VisualAnalyzer />}
          {activeView === 'marketplace' && <Marketplace />}
          {activeView === 'settings' && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Account Settings</h2>
              <div className="space-y-6 max-w-md">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Farmer Name</label>
                  <p className="text-lg font-bold text-slate-800">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <p className="text-lg font-bold text-slate-800">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Farm Name</label>
                  <p className="text-lg font-bold text-slate-800">{user.farmName}</p>
                </div>
                <div className="pt-6">
                  <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

import React from 'react';
import { Home, Calendar, Users, User } from 'lucide-react';

export type CarePlusTab = 'home' | 'appointments' | 'doctors' | 'profile';

interface CarePlusBottomNavProps {
  currentTab: CarePlusTab;
  onTabChange: (tab: CarePlusTab) => void;
  appointmentsCount?: number;
}

export const CarePlusBottomNav: React.FC<CarePlusBottomNavProps> = ({
  currentTab,
  onTabChange,
  appointmentsCount = 0,
}) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'appointments' as const, label: 'Appointments', icon: Calendar, badge: appointmentsCount },
    { id: 'doctors' as const, label: 'Doctors', icon: Users },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_-2px_rgba(0,103,120,0.06)] px-4 py-2 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition active:scale-90 group relative"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? 'text-[#007e8a] stroke-[2.4] scale-110'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] bg-[#007e8a] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center px-0.5 ring-2 ring-white">
                    {tab.badge}
                  </span>
                ) : null}
              </div>

              <span
                className={`text-[11px] mt-1 transition-all ${
                  isActive
                    ? 'font-bold text-[#007e8a]'
                    : 'font-medium text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {/* Active pill dot indicator */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#007e8a] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

import React, { createContext, useContext, useState } from 'react';

export interface Tab {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  tabs: Tab[];
  variant?: 'default' | 'pills' | 'underline' | 'segmented';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  fullWidth?: boolean;
}

interface TabsContextType {
  value: string;
  onChange: (value: string) => void;
  variant: TabsProps['variant'];
  size: TabsProps['size'];
  orientation: TabsProps['orientation'];
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

export const Tabs: React.FC<TabsProps> = ({
  value,
  onChange,
  tabs,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  className = '',
  fullWidth = false,
}) => {
  const contextValue: TabsContextType = {
    value,
    onChange,
    variant,
    size,
    orientation,
  };

  const getBaseClasses = () => {
    const base = ['flex'];
    
    if (orientation === 'horizontal') {
      base.push('flex-row border-b border-gray-200');
    } else {
      base.push('flex-col border-r border-gray-200');
    }
    
    if (className) {
      base.push(className);
    }
    
    return base.join(' ');
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={getBaseClasses()} role="tablist">
        {tabs.map((tab) => (
          <TabTrigger
            key={tab.value}
            tab={tab}
            fullWidth={fullWidth}
          />
        ))}
      </div>
    </TabsContext.Provider>
  );
};

interface TabTriggerProps {
  tab: Tab;
  fullWidth?: boolean;
}

const TabTrigger: React.FC<TabTriggerProps> = ({ tab, fullWidth }) => {
  const { value, onChange, variant, size, orientation } = useTabs();
  const isActive = value === tab.value;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    const base = ['flex items-center gap-2 font-medium whitespace-nowrap  cursor-pointer transition-all duration-200'];
    
    switch (variant) {
      case 'pills':
        base.push('rounded-lg');
        if (isActive) {
          base.push('bg-indigo-100 text-indigo-700');
        } else {
          base.push('text-gray-500 hover:text-gray-700 hover:bg-gray-100');
        }
        break;
      
      case 'underline':
        base.push('border-b-2');
        if (isActive) {
          base.push('border-indigo-600 text-indigo-600');
        } else {
          base.push('border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300');
        }
        break;
      
      case 'segmented':
        base.push('border first:rounded-l-lg last:rounded-r-lg');
        if (isActive) {
          base.push('bg-indigo-600 text-white border-indigo-600');
        } else {
          base.push('bg-white text-gray-700 border-gray-300 hover:bg-gray-50');
        }
        break;
      
      default:
        base.push('border-b-2 border-transparent');
        if (isActive) {
          base.push('border-indigo-600 text-indigo-600');
        } else {
          base.push('text-gray-500 hover:text-gray-700 hover:border-gray-300');
        }
        break;
    }
    
    if (tab.disabled) {
      base.push('opacity-50 cursor-not-allowed');
    }
    
    return base.join(' ');
  };

  const getOrientationClasses = () => {
    return orientation === 'vertical' ? 'justify-start text-left' : 'justify-center text-center';
  };

  const getWidthClasses = () => {
    return fullWidth ? 'flex-1' : '';
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const getBadgeClasses = () => {
    const base = ['inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full'];
    
    if (isActive && variant === 'segmented') {
      base.push('bg-white text-indigo-600');
    } else if (isActive) {
      base.push('bg-indigo-200 text-indigo-800');
    } else {
      base.push('bg-gray-100 text-gray-600');
    }
    
    return base.join(' ');
  };

  const classes = [
    getSizeClasses(),
    getVariantClasses(),
    getOrientationClasses(),
    getWidthClasses(),
  ].join(' ');

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-disabled={tab.disabled}
      disabled={tab.disabled}
      onClick={() => !tab.disabled && onChange(tab.value)}
      className={classes}
    >
      {tab.icon && <tab.icon className={`flex-shrink-0 ${getIconSize()}`} />}
      <span>{tab.label}</span>
      {tab.badge && (
        <span className={getBadgeClasses()}>
          {tab.badge}
        </span>
      )}
    </button>
  );
};

// Tab Content Component
interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  forceRender?: boolean;
}

export const TabContent: React.FC<TabContentProps> = ({
  value,
  children,
  className = '',
  forceRender = false,
}) => {
  const { value: currentValue } = useTabs();
  const isActive = currentValue === value;

  if (!isActive && !forceRender) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      className={isActive ? `block ${className}` : `hidden ${className}`}
    >
      {children}
    </div>
  );
};

// Tabs Container Component for complete tab system
interface TabsContainerProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  defaultValue,
  children,
  className = '',
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={className}>
      <TabsContext.Provider value={{
        value,
        onChange: handleChange,
        variant: 'default',
        size: 'md',
        orientation: 'horizontal',
      }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
};
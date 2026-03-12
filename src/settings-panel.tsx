import { useState } from 'react';

interface SettingsPanelProps {
  onToggleSensitiveInfo: (show: boolean) => void;
  showSensitiveInfo: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onToggleSensitiveInfo,
  showSensitiveInfo,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSensitiveInfo = () => {
    const newState = !showSensitiveInfo;
    onToggleSensitiveInfo(newState);
    setIsExpanded(true);
  };

  return (
    <div className="settings-panel">
      <button
        className="settings-toggle"
        onClick={toggleSensitiveInfo}
        aria-expanded={isExpanded}
      >
        {showSensitiveInfo ? 'Hide Sensitive Info' : 'Show Sensitive Info'}
      </button>

      {isExpanded && (
        <div className="settings-preview">
          <p>Preview Section for Configuration</p>
          <p>Toggle state: {showSensitiveInfo ? 'Visible' : 'Hidden'}</p>
        </div>
      )}
    </div>
  );
};

export type SettingsPanelProps = {
  onToggleSensitiveInfo: (show: boolean) => void;
  showSensitiveInfo: boolean;
};
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsPanel } from '../settings-panel';

describe('SettingsPanel', () => {
  let onToggleSensitiveInfo: (show: boolean) => void;
  let showSensitiveInfo: boolean;

  beforeEach(() => {
    onToggleSensitiveInfo = vi.fn();
    showSensitiveInfo = true;
  });

  it('renders toggle button with correct initial text', () => {
    render(
      <SettingsPanel
        showSensitiveInfo={showSensitiveInfo}
        onToggleSensitiveInfo={onToggleSensitiveInfo}
      />
    );

    expect(screen.getByText('Show Sensitive Info')).toBeInTheDocument();
  });

  it('calls onToggleSensitiveInfo when toggle button is clicked', () => {
    render(
      <SettingsPanel
        showSensitiveInfo={showSensitiveInfo}
        onToggleSensitiveInfo={onToggleSensitiveInfo}
      />
    );

    const toggleButton = screen.getByText('Show Sensitive Info');
    fireEvent.click(toggleButton);

    expect(onToggleSensitiveInfo).toHaveBeenCalledWith(false);
  });

  it('renders preview section when expanded', () => {
    render(
      <SettingsPanel
        showSensitiveInfo={showSensitiveInfo}
        onToggleSensitiveInfo={onToggleSensitiveInfo}
      />
    );

    const toggleButton = screen.getByText('Show Sensitive Info');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Preview Section for Configuration')).toBeInTheDocument();
    expect(screen.getByText('Toggle state: Visible')).toBeInTheDocument();
  });
});
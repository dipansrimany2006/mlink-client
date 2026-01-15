import { Badge } from '@/components/ui/badge'

export default function ThemingPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Client
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Theming
        </h1>
        <p className="text-xl text-muted-foreground">
          Customize the look and feel of your mlinks to match your brand.
        </p>
      </div>

      {/* Theme Presets */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Presets</h2>
        <p className="text-muted-foreground">
          The SDK includes three built-in theme presets:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { Mlink } from '@dipansrimany/mlink-sdk/react';

// Light theme (default)
<Mlink url="..." adapter={adapter} theme="light" />

// Dark theme
<Mlink url="..." adapter={adapter} theme="dark" />

// Mantle branded theme
<Mlink url="..." adapter={adapter} theme="mantle" />`}</code>
          </pre>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border p-4 bg-white">
            <h3 className="font-semibold mb-2 text-black">Light</h3>
            <p className="text-sm text-black/60">
              Clean white background with subtle shadows.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4 bg-zinc-900">
            <h3 className="font-semibold mb-2 text-white">Dark</h3>
            <p className="text-sm text-white/60">
              Dark background ideal for dark mode apps.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4 bg-[#0a0a0a]">
            <h3 className="font-semibold mb-2 text-[#64B3AE]">Mantle</h3>
            <p className="text-sm text-white/60">
              Mantle branded with teal accents.
            </p>
          </div>
        </div>
      </div>

      {/* MlinkTheme Interface */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Variables</h2>
        <p className="text-muted-foreground">
          Themes are defined using CSS custom properties:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface MlinkTheme {
  // Background colors
  '--mlink-bg-primary': string;
  '--mlink-bg-secondary': string;

  // Border
  '--mlink-border-color': string;

  // Text colors
  '--mlink-text-primary': string;
  '--mlink-text-secondary': string;
  '--mlink-text-link': string;

  // Button styles
  '--mlink-button-bg': string;
  '--mlink-button-text': string;
  '--mlink-button-hover': string;
  '--mlink-button-disabled': string;

  // Input styles
  '--mlink-input-bg': string;
  '--mlink-input-border': string;
  '--mlink-input-text': string;
  '--mlink-input-placeholder': string;

  // Status colors
  '--mlink-success': string;
  '--mlink-error': string;
  '--mlink-warning': string;

  // Border radius
  '--mlink-border-radius': string;
  '--mlink-button-radius': string;
  '--mlink-input-radius': string;

  // Shadow
  '--mlink-shadow': string;
}`}</code>
          </pre>
        </div>
      </div>

      {/* Custom Theme */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Theme</h2>
        <p className="text-muted-foreground">
          Create a custom theme by providing a partial or complete theme object:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { Mlink, darkTheme } from '@dipansrimany/mlink-sdk/react';

// Extend the dark theme with custom colors
const customTheme = {
  ...darkTheme,
  '--mlink-button-bg': '#8B5CF6',      // Purple buttons
  '--mlink-button-hover': '#7C3AED',
  '--mlink-text-link': '#8B5CF6',
  '--mlink-border-radius': '16px',     // More rounded
};

<Mlink url="..." adapter={adapter} theme={customTheme} />`}</code>
          </pre>
        </div>
      </div>

      {/* Partial Theme Override */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Partial Overrides</h2>
        <p className="text-muted-foreground">
          Override just the properties you need:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// Override specific properties (inherits from light theme)
<Mlink
  url="..."
  adapter={adapter}
  theme={{
    '--mlink-button-bg': '#EC4899',
    '--mlink-button-hover': '#DB2777',
  }}
/>`}</code>
          </pre>
        </div>
      </div>

      {/* MlinkProvider */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Global Theme with MlinkProvider</h2>
        <p className="text-muted-foreground">
          Set a theme for all Mlink components using the provider:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { MlinkProvider, Mlink } from '@dipansrimany/mlink-sdk/react';

function App() {
  return (
    <MlinkProvider theme="dark">
      {/* All Mlinks will use dark theme */}
      <Mlink url="/api/action/donate" adapter={adapter} />
      <Mlink url="/api/action/stake" adapter={adapter} />

      {/* Override for specific component */}
      <Mlink url="/api/action/swap" adapter={adapter} theme="light" />
    </MlinkProvider>
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Theme Utilities */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Utilities</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import {
  lightTheme,
  darkTheme,
  mantleTheme,
  themePresets,
  resolveTheme,
} from '@dipansrimany/mlink-sdk/react';

// Access preset themes
console.log(themePresets.dark);
console.log(themePresets.light);
console.log(themePresets.mantle);

// Resolve a theme (handles presets and partials)
const theme = resolveTheme('dark');
const customTheme = resolveTheme({
  '--mlink-button-bg': '#8B5CF6',
});`}</code>
          </pre>
        </div>
      </div>

      {/* Default Theme Values */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Default Theme Values (Dark)</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`const darkTheme: MlinkTheme = {
  '--mlink-bg-primary': '#18181b',
  '--mlink-bg-secondary': '#27272a',
  '--mlink-border-color': '#3f3f46',
  '--mlink-text-primary': '#fafafa',
  '--mlink-text-secondary': '#a1a1aa',
  '--mlink-text-link': '#64B3AE',
  '--mlink-button-bg': '#fafafa',
  '--mlink-button-text': '#18181b',
  '--mlink-button-hover': '#e4e4e7',
  '--mlink-button-disabled': '#52525b',
  '--mlink-input-bg': '#27272a',
  '--mlink-input-border': '#3f3f46',
  '--mlink-input-text': '#fafafa',
  '--mlink-input-placeholder': '#71717a',
  '--mlink-success': '#22c55e',
  '--mlink-error': '#ef4444',
  '--mlink-warning': '#f59e0b',
  '--mlink-border-radius': '12px',
  '--mlink-button-radius': '8px',
  '--mlink-input-radius': '8px',
  '--mlink-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.3)',
};`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

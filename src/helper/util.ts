export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function capitalize(value: string): string {
  return value.replace(/(^\w)|(\s+\w)/g, (letter) => letter.toUpperCase());
}

export function fireEvent(target: HTMLElement, name: string, detail: unknown): void {
  target.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
}

let loading: Promise<void> | undefined;
/** Load HA's selector form via its card helpers, without requiring a dashboard button card. */
export async function loadHaComponents(): Promise<void> {
  if (customElements.get('ha-form')) return;
  loading ??= (async () => {
      if (!window.loadCardHelpers) throw new Error('Home Assistant card helpers are unavailable.');
      const helpers = await window.loadCardHelpers();
      const card = helpers.createCardElement({ type: 'button' });
      const constructor = card.constructor as typeof HTMLElement & {
        getConfigElement?: () => Promise<HTMLElement>;
      };
      if (!constructor.getConfigElement) throw new Error('Home Assistant button editor is unavailable.');
      await constructor.getConfigElement();
      if (!customElements.get('ha-form')) throw new Error('Home Assistant form did not load.');
    })();
  try {
    await loading;
  } catch (error) {
    loading = undefined; // Allow retry after a failed frontend module load.
    throw error;
  }
}

import { afterEach, expect, it } from 'vitest';
import { EnergyOverviewCard } from '../src/energy-overview-card';
import type { HomeAssistant } from '../src/ha-types';

const hass: HomeAssistant = {
  states: { 'sensor.power': { state: '500', attributes: { unit_of_measurement: 'W' } } },
  locale: { language: 'en' }, localize: () => '',
};
afterEach(() => { document.body.replaceChildren(); });
async function card(entities: any[] = [{ power: 'sensor.power' }]) {
  const element = new EnergyOverviewCard();
  element.hass = hass;
  element.setConfig({ type: 'custom:energy-overview-card', entities });
  document.body.append(element);
  await element.updateComplete;
  return element;
}
it('registers in the card picker before loading the editor', () => {
  expect(window.customCards?.some((entry) => entry.type === 'energy-overview-card')).toBe(true);
});
it('renders missing and unavailable states without a motion element', async () => {
  const element = await card([{ power: 'sensor.missing', voltage: 'sensor.missing' }, { power: '' }]);
  expect(element.shadowRoot!.textContent).toContain('Not found');
  expect(element.shadowRoot!.textContent).toContain('Not configured');
  expect(element.shadowRoot!.querySelector('animateMotion')).toBeNull();
  element.hass = { ...hass, states: { 'sensor.missing': { state: 'unavailable', attributes: {} } } };
  await element.updateComplete;
  expect(element.shadowRoot!.textContent).toContain('unavailable');
});
it('renders sensor-derived markup as text', async () => {
  const element = await card([{ power: 'sensor.power', voltage: 'sensor.bad' }]);
  element.hass = { ...hass, states: { ...hass.states, 'sensor.bad': { state: '<img src=x onerror=alert(1)>', attributes: {} } } };
  await element.updateComplete;
  expect(element.shadowRoot!.querySelector('img')).toBeNull();
  expect(element.shadowRoot!.textContent).toContain('<img');
});
it('preserves motion nodes across updates and uses inline independent paths', async () => {
  const first = await card([{ power: 'sensor.power' }, { power: 'sensor.power' }]);
  const second = await card();
  const motion = first.shadowRoot!.querySelector('animateMotion');
  expect(motion?.getAttribute('path')).toBe('M0,5 H100');
  expect(motion?.namespaceURI).toBe('http://www.w3.org/2000/svg');
  expect(first.shadowRoot!.querySelector('[id="grid"]')).toBeNull();
  first.hass = { ...hass, states: { 'sensor.power': { state: '-250', attributes: {} } } };
  await first.updateComplete;
  expect(first.shadowRoot!.querySelector('animateMotion')).toBe(motion);
  expect(motion?.getAttribute('keyPoints')).toBe('1;0');
  expect(second.shadowRoot!.querySelector('animateMotion')?.getAttribute('keyPoints')).toBe('0;1');
});
it.each([180, 320, 768, 1280])('does not overflow a %s px card with long labels and optional metadata', async (width) => {
  const label = 'A very long label with words and unbrokencharacters'.repeat(2);
  const element = await card([{ power: 'sensor.power', name: label, voltage: 'sensor.power', current: 'sensor.power', frequency: 'sensor.power', power_factor: 'sensor.power', label_leading: label, label_trailing: label }]);
  element.style.width = `${width}px`;
  const box = element.getBoundingClientRect();
  for (const child of element.shadowRoot!.querySelectorAll('.entity, .metadata, .main, .line, svg')) {
    const bounds = child.getBoundingClientRect();
    expect(bounds.left).toBeGreaterThanOrEqual(box.left - 1);
    expect(bounds.right).toBeLessThanOrEqual(box.right + 1);
  }
});
it('supports empty previews, validates shape, and sizes title/rows without clipping Sections', async () => {
  const element = await card([]);
  expect(element.shadowRoot!.textContent).toContain('No entities');
  const small = element.getCardSize();
  element.setConfig({ type: 'custom:energy-overview-card', title: 'Power', entities: [{ power: '', name: 'One' }, { power: '' }] });
  expect(element.getCardSize()).toBeGreaterThan(small);
  expect(element.getGridOptions()).toEqual({ columns: 12, min_columns: 6, rows: 'auto' });
  expect(() => element.setConfig({ entities: [null] } as any)).toThrow();
});
it('sorts by measurement without crashing on a missing value', async () => {
  const element = await card();
  element.setConfig({ type: 'custom:energy-overview-card', order_by: 'power', entities: [{ power: 'sensor.missing', name: 'Missing' }, { power: 'sensor.power', name: 'Active' }] });
  await element.updateComplete;
  expect(element.shadowRoot!.querySelector('.name')?.textContent).toBe('Active');
});

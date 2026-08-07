import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from './App.vue'

describe('Vue Feature Lab', () => {
  it('updates reactive and computed values when the counter changes', async () => {
    const wrapper = mount(App)
    const increaseButton = wrapper.get('button[aria-label="Increase count"]')

    expect(wrapper.text()).toContain('count × 2')
    expect(wrapper.text()).toContain('6')

    await increaseButton.trigger('click')

    expect(wrapper.text()).toContain('3 → 4')
    expect(wrapper.text()).toContain('8')
  })
})

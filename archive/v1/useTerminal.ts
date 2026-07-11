export function useTerminal() {
  const terminal = inject('terminal', {
    density: 'dense' as 'dense' | 'comfortable',
    theme: 'light' as 'light' | 'dark',
    toggleDensity: () => {},
    toggleTheme: () => {},
    initialize: () => {},
  })

  onMounted(() => {
    terminal.initialize?.()
  })

  const density = computed(() => terminal.density)
  const theme = computed(() => terminal.theme)

  return {
    density,
    theme,
    toggleDensity: terminal.toggleDensity,
    toggleTheme: terminal.toggleTheme,
  }
}
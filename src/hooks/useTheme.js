import { useState, useEffect } from 'react'

function useTheme() {
  const [dark, setdark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, () => setdark(d => !d)]
}

export default useTheme

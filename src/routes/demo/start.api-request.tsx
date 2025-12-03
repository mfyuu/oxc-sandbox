import { useEffect, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

async function getNames(): Promise<string[]> {
  const res = await fetch('/demo/api/names')
  const data = await res.json()

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format')
  }

  return data.map((item) => String(item))
}

export const Route = createFileRoute('/demo/start/api-request')({
  component: Home,
})

function Home() {
  const [names, setNames] = useState<Array<string>>([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const fetchedNames = await getNames()
        if (!cancelled) {
          setNames(fetchedNames)
        }
      } catch (error) {
        console.error('Failed to fetch names', error)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 text-white"
      style={{
        backgroundColor: '#000',
        backgroundImage:
          'radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)',
      }}
    >
      <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <h1 className="text-2xl mb-4">Start API Request Demo - Names List</h1>
        <ul className="mb-4 space-y-2">
          {names.map((name) => (
            <li
              key={name}
              className="bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md"
            >
              <span className="text-lg text-white">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

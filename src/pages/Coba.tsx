import { useEffect, useState } from 'react'

const useDebounce = (val: string, delay: number) => {
  const [value, stValue] = useState(val)
  const [isError, setIsError] = useState(false)

  const validate = (value: string) => {
    let newVal = value.replace(/\s/g, '')
    if (newVal.length < 6 || newVal.length > 30) return true
    return false
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      stValue(val)
      setIsError(validate(val))
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [val, delay])

  return { value, isError }
}

export function Coba() {
  const [input, setInput] = useState('')
  const { value, isError } = useDebounce(input, 500)

  return (
    <div>
      <h1 className='text-2xl text-center p-5 font-bold'>Input Validation</h1>
      <div className='max-w-lg mx-auto'>
        <input
          type='text'
          className='border border-gray-300 rounded-md p-2 w-full'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {value && isError && (
          <p className='text-red-500'>
            Input must be between 6 and 30 characters
          </p>
        )}
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'

// adds a drop shadow to the header once the page has scrolled past the top
export default function useHeaderShadow() {
  const ref = useRef(null)

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return
      ref.current.classList.toggle('shadow', window.scrollY > 0)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return ref
}

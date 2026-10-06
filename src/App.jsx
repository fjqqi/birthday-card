import { useState, useEffect, useRef } from 'react'

const backgrounds = ['/bg1.JPG', '/bg2.JPG']
const popupImages = ['/1.png', '/2.png', '/3.png']

function App() {
  const [bgIndex, setBgIndex] = useState(0)
  const [activeImage, setActiveImage] = useState(null)
  const [isOpened, setIsOpened] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Preload both backgrounds and popup images for instant response
    [...backgrounds, ...popupImages].forEach((src) => {
      const img = new Image()
      img.src = src
    })

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const handleOpenLetter = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/bts.mp3')
      audioRef.current.loop = true
    }
    audioRef.current
      .play()
      .catch((err) => console.warn('Audio playback was prevented:', err))

    setIsOpened(true)
    setTimeout(() => {
      setHasEntered(true)
    }, 700)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-start sm:items-center">
      <main className="w-full max-w-[430px] aspect-[1/2] text-white shadow-2xl relative overflow-hidden select-none">
        {/* Layer 1: Base background (always present, guarantees zero black flashes) */}
        <img
          src="/bg1.JPG"
          alt="Birthday Card"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Layer 2: Alternate twinkle frame */}
        <img
          src="/bg2.JPG"
          alt="Birthday Card Blink"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none ${
            bgIndex === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Interactive Hotspots (locked to stickers via percentages) */}
        <button
          type="button"
          onClick={() => setActiveImage('/1.png')}
          className="btn-1 absolute z-10 -rotate-[4deg] cursor-pointer bg-red-800/0 hover:bg-red-800/20 active:bg-red-800/30 transition-colors"
          style={{
            top: '47.4%',
            left: '16.7%',
            width: '22.3%',
            height: '4.7%',
          }}
          aria-label="Open Image 1 (Make)"
        />
        <button
          type="button"
          onClick={() => setActiveImage('/2.png')}
          className="btn-2 absolute z-10 rotate-[3deg] cursor-pointer bg-red-800/0 hover:bg-red-800/20 active:bg-red-800/30 transition-colors"
          style={{
            top: '54.4%',
            left: '26.1%',
            width: '11.2%',
            height: '3.7%',
          }}
          aria-label="Open Image 2 (a)"
        />
        <button
          type="button"
          onClick={() => setActiveImage('/3.png')}
          className="btn-3 absolute z-10 rotate-[0deg] cursor-pointer bg-red-800/0 hover:bg-red-800/20 active:bg-red-800/30 transition-colors"
          style={{
            top: '60.9%',
            left: '20.5%',
            width: '18.6%',
            height: '3.7%',
          }}
          aria-label="Open Image 3 (wish!)"
        />

        {/* Opening Letter Screen Overlay */}
        {!hasEntered && (
          <div
            className={`absolute inset-0 z-40 bg-zinc-950/85 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-700 ease-out ${isOpened ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
              }`}
          >
            {/* Scrapbook Card Box */}
            <div className="w-full max-w-[325px] bg-[#fef49c] border-[2.5px] border-[#2e1810] rounded-2xl p-5 shadow-[6px_6px_0px_#2e1810] flex flex-col items-center text-center relative select-none animate-modal-content">
              {/* Pink Star Doodles */}
              <svg className="absolute top-2.5 right-3 w-7 h-7 text-[#ff5bb0] rotate-12 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <svg className="absolute top-8 left-2 w-6 h-6 text-[#ff5bb0] -rotate-12 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <svg className="absolute bottom-18 right-2.5 w-6 h-6 text-[#ff5bb0] rotate-45 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <svg className="absolute bottom-3 left-3 w-7 h-7 text-[#ff5bb0] -rotate-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>

              {/* Hand-drawn Title */}
              <h2 className="font-handwriting text-3xl font-bold text-[#2e1810] tracking-wide -rotate-2 mt-1 mb-3">
                Happy Birthday!!!
              </h2>

              {/* Center Pink Scrapbook Paper with Oval Cutout */}
              <div className="relative my-2 w-full flex items-center justify-center">
                <div className="bg-[#ff5eb5] border-2 border-[#2e1810] p-3 rounded-md shadow-[4px_4px_0px_#2e1810] -rotate-1 flex flex-col items-center">
                  <div className="w-24 h-32 rounded-[50%] bg-[#fffdf0] border-2 border-[#2e1810] flex items-center justify-center text-4xl shadow-inner overflow-hidden">
                    💌
                  </div>
                  <span className="font-handwriting text-xs text-[#2e1810] mt-1.5 font-semibold">
                    (Made with love)
                  </span>
                </div>

                {/* "Make a wish!" Cutout Stickers */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-start pointer-events-none">
                  <span className="bg-[#fffdf0] border-2 border-[#2e1810] px-2 py-0.5 text-xs font-bold text-[#2e1810] font-doodle -rotate-3 shadow-[2px_2px_0px_#2e1810]">
                    22
                  </span>

                </div>
              </div>

              {/* Click to open Button styled as Cutout Sticker */}
              <button
                type="button"
                onClick={handleOpenLetter}
                className="mt-4 bg-[#fffdf0] border-[2.5px] border-[#2e1810] text-[#2e1810] px-6 py-2.5 rounded-xl font-doodle text-lg font-bold shadow-[4px_4px_0px_#2e1810] hover:shadow-[2px_2px_0px_#2e1810] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer z-10"
              >
                <span>click to open</span>
                <span className="text-xl">❤️</span>
              </button>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {activeImage && (
          <div
            className="absolute inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer animate-modal-backdrop"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-full flex flex-col items-center gap-3 animate-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage}
                alt="Popup content"
                className="max-w-[340px] w-full h-auto object-contain drop-shadow-2xl rounded-xl"
              />
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="text-white text-sm font-medium underline underline-offset-4 hover:text-zinc-300 cursor-pointer transition-colors"
              >
                close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

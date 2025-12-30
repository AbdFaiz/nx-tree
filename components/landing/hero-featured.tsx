const Herofeatured = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
  return (
   <div className="flex items-center gap-2 grayscale opacity-40 hover:opacity-100 transition-all duration-300">
      <div className="scale-75">{icon}</div>
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{text}</span>
    </div>
  )
}

export default Herofeatured

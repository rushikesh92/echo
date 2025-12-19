function Container({ children }) {
  return (
    <div
      className="
        w-full h-full
        rounded-2xl
        border border-transparent
        flex overflow-hidden
        bg-slate-900/40 
      "
    >
      {children}
    </div>
  );
}

export default Container;

const ContentStep = ({
  stateIndex,
  index,
  children,
}: {
  stateIndex: number;
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex flex-col transition-transform duration-1000  items-center ${stateIndex === index ? 'translate-x-0' : 'absolute translate-x-400'}`}
    >
      {children}
    </div>
  );
};

export default ContentStep;

import { useSelector } from 'react-redux';

const App = () => {
  const userState = useSelector((state: unknown) => state.user);
  console.log(userState);

  return (
    <div>
      <h1 className="text-2xl">Hello world</h1>
    </div>
  );
};

export default App;

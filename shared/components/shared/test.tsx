import { FC } from 'react';

interface TestProps {
  name: string;
}

const Test: FC<TestProps> = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Test;

import { useMoveBack } from "../hooks/useMoveBack";
import Button from "./Button";

function Empty({ resource }) {
  const backButton = useMoveBack();

  return (
    <>
      <p>No {resource} could be found.</p>
      <Button onClick={backButton}> Back </Button>
    </>
  );
}

export default Empty;
